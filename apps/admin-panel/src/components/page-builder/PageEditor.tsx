'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { pagesApi } from '@/lib/api';
import { getSectionEditor } from './SectionEditors';
import { toast } from 'sonner';

interface PageSection {
  id: string;
  type: string;
  order: number;
  visible: boolean;
  content: Record<string, any>;
}

interface PageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  sections: PageSection[];
}

interface SectionType {
  type: string;
  label: string;
  description: string;
  icon: string;
}

const sectionTypeLabels: Record<string, string> = {
  HERO_BANNER: 'Hero Banner',
  TEXT_IMAGE: 'Text + Image',
  VALUES_GRID: 'Values / Features Grid',
  TEAM: 'Team / Doctors',
  CONTACT_CARDS: 'Contact Info Cards',
  CONTACT_FORM: 'Contact Form',
  GOOGLE_MAP: 'Google Map',
  FAQ_SECTION: 'FAQ Accordion',
  TESTIMONIALS: 'Testimonials',
  CTA_BANNER: 'Call to Action',
  GALLERY: 'Image Gallery',
  VIDEO_EMBED: 'Video Embed',
  RICH_TEXT: 'Rich Text Block',
  WHATSAPP_CTA: 'WhatsApp CTA',
  STATS_COUNTER: 'Stats / Counters',
  BULLET_LIST: 'Bullet List',
};

const sectionTypeIcons: Record<string, string> = {
  HERO_BANNER: '🎯',
  TEXT_IMAGE: '📝',
  VALUES_GRID: '⭐',
  TEAM: '👨‍⚕️',
  CONTACT_CARDS: '📞',
  CONTACT_FORM: '📋',
  GOOGLE_MAP: '📍',
  FAQ_SECTION: '❓',
  TESTIMONIALS: '💬',
  CTA_BANNER: '📢',
  GALLERY: '📷',
  VIDEO_EMBED: '🎬',
  RICH_TEXT: '📄',
  WHATSAPP_CTA: '💬',
  STATS_COUNTER: '📊',
  BULLET_LIST: '📋',
};

function SortableSection({
  section,
  isExpanded,
  onToggleExpand,
  onToggleVisibility,
  onDelete,
  onContentChange,
}: {
  section: PageSection;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
  onContentChange: (content: Record<string, any>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Editor = getSectionEditor(section.type);

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`border ${section.visible ? 'border-gray-200' : 'border-dashed border-gray-300 bg-gray-50'} ${isDragging ? 'shadow-lg' : ''}`}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 text-lg" title="Drag to reorder">
            ☰
          </button>
          <span className="text-xl">{sectionTypeIcons[section.type] || '📦'}</span>
          <div className="flex-1 min-w-0">
            <button onClick={onToggleExpand} className="text-left w-full">
              <h3 className="font-medium text-gray-900 text-sm truncate">
                {sectionTypeLabels[section.type] || section.type}
              </h3>
              <p className="text-xs text-gray-400 truncate">
                {section.content?.title || section.content?.heading || section.content?.badge || 'Click to edit'}
              </p>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleVisibility}
              className={`p-1.5 rounded-md text-sm transition-colors ${section.visible ? 'text-teal-600 hover:bg-teal-50' : 'text-gray-400 hover:bg-gray-100'}`}
              title={section.visible ? 'Visible - Click to hide' : 'Hidden - Click to show'}
            >
              {section.visible ? '👁' : '👁‍🗨'}
            </button>
            <button onClick={onToggleExpand} className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 text-sm" title="Edit section">
              ✏️
            </button>
            <button onClick={onDelete} className="p-1.5 rounded-md text-red-400 hover:bg-red-50 text-sm" title="Delete section">
              🗑️
            </button>
          </div>
        </div>

        {isExpanded && (
          <CardContent className="p-4">
            {Editor ? (
              <Editor content={section.content} onChange={onContentChange} />
            ) : (
              <p className="text-sm text-gray-500">No editor available for this section type.</p>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default function PageEditor({ slug }: { slug: string }) {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sectionTypes, setSectionTypes] = useState<SectionType[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  useEffect(() => {
    loadPage();
    loadSectionTypes();
  }, [slug]);

  const loadPage = async () => {
    setLoading(true);
    try {
      const response = await pagesApi.getPage(slug);
      if (response.data) {
        const data = response.data;
        data.sections = (data.sections || []).sort((a: PageSection, b: PageSection) => a.order - b.order);
        setPageData(data);
      }
    } catch {
      toast.error('Failed to load page');
    } finally {
      setLoading(false);
    }
  };

  const loadSectionTypes = async () => {
    const response = await pagesApi.getSectionTypes();
    setSectionTypes(response.data || []);
  };

  const handleSave = async () => {
    if (!pageData) return;
    setSaving(true);
    try {
      await pagesApi.updatePage(slug, {
        metaTitle: pageData.metaTitle,
        metaDescription: pageData.metaDescription,
        sections: pageData.sections,
      });
      toast.success('Page saved successfully!');
      setHasChanges(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  const updatePageData = useCallback((updater: (prev: PageData) => PageData) => {
    setPageData((prev) => {
      if (!prev) return prev;
      const updated = updater(prev);
      setHasChanges(true);
      return updated;
    });
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !pageData) return;

    const oldIndex = pageData.sections.findIndex((s) => s.id === active.id);
    const newIndex = pageData.sections.findIndex((s) => s.id === over.id);

    updatePageData((prev) => {
      const reordered = arrayMove(prev.sections, oldIndex, newIndex).map((s, i) => ({ ...s, order: i }));
      return { ...prev, sections: reordered };
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleVisibility = (id: string) => {
    updatePageData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
    }));
  };

  const deleteSection = (id: string) => {
    updatePageData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id).map((s, i) => ({ ...s, order: i })),
    }));
  };

  const updateSectionContent = (id: string, content: Record<string, any>) => {
    updatePageData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, content } : s)),
    }));
  };

  const addSection = (type: string) => {
    if (!pageData) return;
    const newId = `${slug}-${type.toLowerCase()}-${Date.now()}`;
    const newSection: PageSection = {
      id: newId,
      type,
      order: pageData.sections.length,
      visible: true,
      content: getDefaultContent(type),
    };
    updatePageData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setIsAddDialogOpen(false);
    setExpandedSections((prev) => new Set([...prev, newId]));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (!pageData) {
    return <div className="text-center py-16 text-gray-500">Page not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-900">{pageData.title} Page Editor</h1>
          <p className="text-gray-600 mt-1">
            Drag to reorder, click to edit, toggle visibility, or add new sections
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`http://localhost:2900/${slug === 'about' ? 'about' : 'contact'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            ↗ Preview
          </a>
          <Button onClick={handleSave} disabled={saving || !hasChanges} className="bg-teal-700 hover:bg-teal-800">
            {saving ? 'Saving...' : hasChanges ? 'Save Changes' : 'Saved'}
          </Button>
        </div>
      </div>

      {/* Meta Fields */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500">SEO Title</Label>
              <Input
                value={pageData.metaTitle || ''}
                onChange={(e) => updatePageData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">SEO Description</Label>
              <Input
                value={pageData.metaDescription || ''}
                onChange={(e) => updatePageData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                className="text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={pageData.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {pageData.sections.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                isExpanded={expandedSections.has(section.id)}
                onToggleExpand={() => toggleExpand(section.id)}
                onToggleVisibility={() => toggleVisibility(section.id)}
                onDelete={() => deleteSection(section.id)}
                onContentChange={(content) => updateSectionContent(section.id, content)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Section Button */}
      <button
        onClick={() => setIsAddDialogOpen(true)}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50/50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
      >
        <span className="text-lg">+</span> Add New Section
      </button>

      {/* Add Section Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogDescription>Choose a section type to add to your page</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
            {sectionTypes.map((st) => (
              <button
                key={st.type}
                onClick={() => addSection(st.type)}
                className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:bg-teal-50/50 transition-all text-left group"
              >
                <span className="text-2xl">{st.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm group-hover:text-teal-700">{st.label}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{st.description}</p>
                </div>
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getDefaultContent(type: string): Record<string, any> {
  const defaults: Record<string, any> = {
    HERO_BANNER: { badge: '', title: 'New Section', subtitle: '', backgroundImage: '', ctaText: '', ctaLink: '' },
    TEXT_IMAGE: { sectionLabel: '', heading: 'New Section', body: '<p></p>', image: '', imagePosition: 'right' },
    VALUES_GRID: { title: 'New Section', subtitle: '', columns: 3, items: [{ icon: '⭐', title: 'Item 1', description: 'Description here' }] },
    TEAM: { title: 'Our Team', subtitle: '', showAll: true, doctorIds: [] },
    CONTACT_CARDS: { items: [{ icon: '📞', title: 'Phone', details: ['+91 000-000-0000'], actionText: 'Call Now', actionLink: 'tel:+910000000000' }] },
    CONTACT_FORM: { title: 'Send us a Message', subtitle: '', recipientEmail: '', subjectOptions: ['General Inquiry'], successMessage: 'Thank you for your message!' },
    GOOGLE_MAP: { title: 'Our Location', embedUrl: '', address: '' },
    FAQ_SECTION: { title: 'Frequently Asked Questions', items: [{ question: 'Question?', answer: 'Answer here.' }], showViewAll: false, viewAllLink: '/faq' },
    TESTIMONIALS: { title: 'What Our Patients Say', subtitle: '' },
    CTA_BANNER: { title: 'Ready to Get Started?', subtitle: '', buttonText: 'Book Now', buttonLink: '/book-appointment', backgroundColor: '#2D5A3D' },
    GALLERY: { title: 'Gallery', images: [] },
    VIDEO_EMBED: { title: 'Watch', videoUrl: '', description: '' },
    RICH_TEXT: { title: '', body: '<p>Enter your content here...</p>' },
    WHATSAPP_CTA: { title: 'Chat with Us', subtitle: 'Quick responses via WhatsApp', phoneNumber: '', buttonText: 'Chat on WhatsApp' },
    STATS_COUNTER: { title: 'By the Numbers', items: [{ icon: '📊', number: '0', label: 'Label' }] },
    BULLET_LIST: { title: 'Information', items: ['Item 1'] },
  };
  return defaults[type] || {};
}
