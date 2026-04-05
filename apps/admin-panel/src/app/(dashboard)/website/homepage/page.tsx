'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, GripVertical, Layout, Image, Type, Star, Mail, MousePointer, ToggleLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { homepageApi, mediaApi } from '@/lib/api';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  type: string;
}

interface HomepageSettings {
  hero: {
    title: string;
    subtitle: string;
    badgeText: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    backgroundImage: string;
    enabled: boolean;
  };
  trustBadges: {
    stats: { icon: string; value: string; label: string; color: string }[];
    certifications: string[];
    enabled: boolean;
  };
  whyChoose: {
    title: string;
    subtitle: string;
    features: { icon: string; title: string; description: string }[];
    enabled: boolean;
  };
  gallery: {
    title: string;
    subtitle: string;
    imageIds: string[];
    enabled: boolean;
  };
  newsletter: {
    title: string;
    subtitle: string;
    buttonText: string;
    enabled: boolean;
  };
  cta: {
    title: string;
    subtitle: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    backgroundImage: string;
    enabled: boolean;
  };
  sectionOrder: { id: string; name: string; order: number; enabled: boolean }[];
}

const sectionIcons: Record<string, React.ReactNode> = {
  hero: <Layout className="w-4 h-4" />,
  trustBadges: <Star className="w-4 h-4" />,
  whyChoose: <Type className="w-4 h-4" />,
  treatments: <Layout className="w-4 h-4" />,
  doctors: <Layout className="w-4 h-4" />,
  testimonials: <Star className="w-4 h-4" />,
  gallery: <Image className="w-4 h-4" />,
  faq: <Type className="w-4 h-4" />,
  newsletter: <Mail className="w-4 h-4" />,
  cta: <MousePointer className="w-4 h-4" />,
};

function SortableSectionItem({
  section,
  onToggle,
}: {
  section: { id: string; name: string; enabled: boolean };
  onToggle: (id: string, enabled: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {sectionIcons[section.id]}
          <span className="font-medium">{section.name}</span>
        </div>
      </div>
      <Switch
        checked={section.enabled}
        onCheckedChange={(checked) => onToggle(section.id, checked)}
      />
    </div>
  );
}

export default function HomepageCMSPage() {
  const [settings, setSettings] = useState<HomepageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [activeTab, setActiveTab] = useState('hero');
  const [expandedSections, setExpandedSections] = useState<string[]>(['hero']);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchSettings();
    fetchMedia();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await homepageApi.getAdminSettings();
      setSettings(response.data);
    } catch (error) {
      toast.error('Failed to load homepage settings');
    } finally {
      setLoading(false);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await mediaApi.getAll({ limit: 100 });
      setMedia(response.data || []);
    } catch (error) {
      console.error('Failed to load media');
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      
      // Strip out fields that shouldn't be sent to API
      const { updatedAt, ...settingsToSend } = settings as any;
      
      await homepageApi.updateSettings(settingsToSend);
      toast.success('Homepage settings saved successfully');
      
      // Refresh settings to confirm save
      await fetchSettings();
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to save homepage settings');
    } finally {
      setSaving(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && settings) {
      const oldIndex = settings.sectionOrder.findIndex((s) => s.id === active.id);
      const newIndex = settings.sectionOrder.findIndex((s) => s.id === over.id);

      const newOrder = arrayMove(settings.sectionOrder, oldIndex, newIndex);
      const updatedOrder = newOrder.map((section, index) => ({
        ...section,
        order: index + 1,
      }));

      setSettings({ ...settings, sectionOrder: updatedOrder });
    }
  };

  const handleSectionToggle = (id: string, enabled: boolean) => {
    if (!settings) return;

    const newOrder = settings.sectionOrder.map((section) =>
      section.id === id ? { ...section, enabled } : section
    );

    setSettings({ ...settings, sectionOrder: newOrder });
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const updateHero = (field: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      hero: { ...settings.hero, [field]: value },
    });
  };

  const updateWhyChoose = (field: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      whyChoose: { ...settings.whyChoose, [field]: value },
    });
  };

  const updateCTA = (field: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      cta: { ...settings.cta, [field]: value },
    });
  };

  const updateNewsletter = (field: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      newsletter: { ...settings.newsletter, [field]: value },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Failed to load homepage settings</p>
        <Button onClick={fetchSettings} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const getMediaUrl = (id: string) => {
    const item = media.find((m) => m.id === id);
    return item?.url || '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-900">Homepage Editor</h1>
          <p className="text-gray-600 mt-1">Customize your website homepage content</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open('http://localhost:2900', '_blank')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-700 hover:bg-teal-800"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Order Panel */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-teal-700" />
              Section Order
            </CardTitle>
            <CardDescription>
              Drag to reorder and toggle visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={settings.sectionOrder.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {settings.sectionOrder.map((section) => (
                    <SortableSectionItem
                      key={section.id}
                      section={section}
                      onToggle={handleSectionToggle}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>

        {/* Content Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection('hero')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5 text-teal-700" />
                  Hero Banner
                </CardTitle>
                {expandedSections.includes('hero') ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.includes('hero') && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={settings.hero.title}
                      onChange={(e) => updateHero('title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Badge Text</Label>
                    <Input
                      value={settings.hero.badgeText}
                      onChange={(e) => updateHero('badgeText', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={settings.hero.subtitle}
                    onChange={(e) => updateHero('subtitle', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary CTA Text</Label>
                    <Input
                      value={settings.hero.primaryCtaText}
                      onChange={(e) => updateHero('primaryCtaText', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary CTA Link</Label>
                    <Input
                      value={settings.hero.primaryCtaLink}
                      onChange={(e) => updateHero('primaryCtaLink', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary CTA Text</Label>
                    <Input
                      value={settings.hero.secondaryCtaText}
                      onChange={(e) => updateHero('secondaryCtaText', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary CTA Link</Label>
                    <Input
                      value={settings.hero.secondaryCtaLink}
                      onChange={(e) => updateHero('secondaryCtaLink', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background Image</Label>
                  <Select
                    value={settings.hero.backgroundImage}
                    onValueChange={(value) => updateHero('backgroundImage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select image from media library" />
                    </SelectTrigger>
                    <SelectContent>
                      {media
                        .filter((m) => m.type === 'IMAGE')
                        .map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {settings.hero.backgroundImage && (
                    <img
                      src={getMediaUrl(settings.hero.backgroundImage)}
                      alt="Hero preview"
                      className="w-32 h-20 object-cover rounded-lg mt-2"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={settings.hero.enabled}
                    onCheckedChange={(checked) => updateHero('enabled', checked)}
                  />
                  <Label>Enabled</Label>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Why Choose Section */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection('whyChoose')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-teal-700" />
                  Why Choose Us
                </CardTitle>
                {expandedSections.includes('whyChoose') ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.includes('whyChoose') && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={settings.whyChoose.title}
                    onChange={(e) => updateWhyChoose('title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={settings.whyChoose.subtitle}
                    onChange={(e) => updateWhyChoose('subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-4">
                  {settings.whyChoose.features.map((feature, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Feature {index + 1}</span>
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...settings.whyChoose.features];
                            newFeatures[index].title = e.target.value;
                            updateWhyChoose('features', newFeatures);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={feature.description}
                          onChange={(e) => {
                            const newFeatures = [...settings.whyChoose.features];
                            newFeatures[index].description = e.target.value;
                            updateWhyChoose('features', newFeatures);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={settings.whyChoose.enabled}
                    onCheckedChange={(checked) => updateWhyChoose('enabled', checked)}
                  />
                  <Label>Enabled</Label>
                </div>
              </CardContent>
            )}
          </Card>

          {/* CTA Section */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection('cta')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5 text-teal-700" />
                  Call to Action
                </CardTitle>
                {expandedSections.includes('cta') ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.includes('cta') && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={settings.cta.title}
                    onChange={(e) => updateCTA('title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={settings.cta.subtitle}
                    onChange={(e) => updateCTA('subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Button Text</Label>
                    <Input
                      value={settings.cta.primaryButtonText}
                      onChange={(e) => updateCTA('primaryButtonText', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Button Link</Label>
                    <Input
                      value={settings.cta.primaryButtonLink}
                      onChange={(e) => updateCTA('primaryButtonLink', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Button Text</Label>
                    <Input
                      value={settings.cta.secondaryButtonText}
                      onChange={(e) => updateCTA('secondaryButtonText', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Button Link</Label>
                    <Input
                      value={settings.cta.secondaryButtonLink}
                      onChange={(e) => updateCTA('secondaryButtonLink', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={settings.cta.enabled}
                    onCheckedChange={(checked) => updateCTA('enabled', checked)}
                  />
                  <Label>Enabled</Label>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Newsletter Section */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection('newsletter')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-teal-700" />
                  Newsletter
                </CardTitle>
                {expandedSections.includes('newsletter') ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.includes('newsletter') && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={settings.newsletter.title}
                    onChange={(e) => updateNewsletter('title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={settings.newsletter.subtitle}
                    onChange={(e) => updateNewsletter('subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={settings.newsletter.buttonText}
                    onChange={(e) => updateNewsletter('buttonText', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={settings.newsletter.enabled}
                    onCheckedChange={(checked) => updateNewsletter('enabled', checked)}
                  />
                  <Label>Enabled</Label>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
