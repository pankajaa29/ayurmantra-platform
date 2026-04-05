'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditorProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

function ArrayItemEditor({
  items,
  fields,
  onChange,
  addLabel,
}: {
  items: any[];
  fields: { key: string; label: string; type?: string }[];
  onChange: (items: any[]) => void;
  addLabel: string;
}) {
  const updateItem = (index: number, key: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    const newItem: Record<string, any> = {};
    fields.forEach((f) => {
      newItem[f.key] = f.type === 'array' ? [] : '';
    });
    onChange([...items, newItem]);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
          <button
            onClick={() => removeItem(index)}
            className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-lg leading-none"
          >
            ✕
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
            {fields.map((field) => (
              <div key={field.key}>
                <Label className="text-xs text-gray-500">{field.label}</Label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={item[field.key] || ''}
                    onChange={(e) => updateItem(index, field.key, e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
                    rows={2}
                  />
                ) : field.type === 'array' ? (
                  <Input
                    value={Array.isArray(item[field.key]) ? item[field.key].join(', ') : item[field.key] || ''}
                    onChange={(e) => updateItem(index, field.key, e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                    placeholder="Comma separated values"
                    className="text-sm"
                  />
                ) : (
                  <Input
                    value={item[field.key] || ''}
                    onChange={(e) => updateItem(index, field.key, e.target.value)}
                    className="text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-teal-400 hover:text-teal-600 transition-colors"
      >
        + {addLabel}
      </button>
    </div>
  );
}

export function HeroBannerEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Badge Text</Label>
        <Input value={content.badge || ''} onChange={(e) => update('badge', e.target.value)} placeholder="e.g. About AyurMantra" />
      </div>
      <div>
        <Label>Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} placeholder="Main heading" />
      </div>
      <div>
        <Label>Subtitle</Label>
        <textarea
          value={content.subtitle || ''}
          onChange={(e) => update('subtitle', e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none text-sm"
          rows={3}
          placeholder="Supporting text"
        />
      </div>
      <div>
        <Label>Background Image URL</Label>
        <Input value={content.backgroundImage || ''} onChange={(e) => update('backgroundImage', e.target.value)} placeholder="https://..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>CTA Button Text</Label>
          <Input value={content.ctaText || ''} onChange={(e) => update('ctaText', e.target.value)} placeholder="Book Now" />
        </div>
        <div>
          <Label>CTA Button Link</Label>
          <Input value={content.ctaLink || ''} onChange={(e) => update('ctaLink', e.target.value)} placeholder="/book-appointment" />
        </div>
      </div>
    </div>
  );
}

export function TextImageEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Label</Label>
        <Input value={content.sectionLabel || ''} onChange={(e) => update('sectionLabel', e.target.value)} placeholder="e.g. Our Story" />
      </div>
      <div>
        <Label>Heading</Label>
        <Input value={content.heading || ''} onChange={(e) => update('heading', e.target.value)} />
      </div>
      <div>
        <Label>Body (HTML supported)</Label>
        <textarea
          value={content.body || ''}
          onChange={(e) => update('body', e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none text-sm font-mono"
          rows={6}
          placeholder="<p>Your content here...</p>"
        />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input value={content.image || ''} onChange={(e) => update('image', e.target.value)} placeholder="https://..." />
      </div>
      <div>
        <Label>Image Position</Label>
        <Select value={content.imagePosition || 'right'} onValueChange={(v) => update('imagePosition', v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function ValuesGridEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input value={content.subtitle || ''} onChange={(e) => update('subtitle', e.target.value)} />
      </div>
      <div>
        <Label>Columns</Label>
        <Select value={String(content.columns || 4)} onValueChange={(v) => update('columns', parseInt(v))}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 Columns</SelectItem>
            <SelectItem value="3">3 Columns</SelectItem>
            <SelectItem value="4">4 Columns</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Items</Label>
        <ArrayItemEditor
          items={content.items || []}
          fields={[
            { key: 'icon', label: 'Icon (emoji)' },
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description', type: 'textarea' },
          ]}
          onChange={(items) => update('items', items)}
          addLabel="Add Item"
        />
      </div>
    </div>
  );
}

export function TeamEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input value={content.subtitle || ''} onChange={(e) => update('subtitle', e.target.value)} />
      </div>
      <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
        Team members are automatically pulled from your Staff/Doctor Management. Go to Doctors page to manage team members.
      </p>
    </div>
  );
}

export function ContactCardsEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <Label>Contact Cards</Label>
      <ArrayItemEditor
        items={content.items || []}
        fields={[
          { key: 'icon', label: 'Icon (emoji)' },
          { key: 'title', label: 'Title' },
          { key: 'details', label: 'Details (comma separated)', type: 'array' },
          { key: 'actionText', label: 'Action Text' },
          { key: 'actionLink', label: 'Action Link' },
        ]}
        onChange={(items) => update('items', items)}
        addLabel="Add Contact Card"
      />
    </div>
  );
}

export function ContactFormEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input value={content.subtitle || ''} onChange={(e) => update('subtitle', e.target.value)} />
      </div>
      <div>
        <Label>Recipient Email</Label>
        <Input value={content.recipientEmail || ''} onChange={(e) => update('recipientEmail', e.target.value)} placeholder="info@ayurmantra.com" />
      </div>
      <div>
        <Label>Subject Options (comma separated)</Label>
        <Input
          value={Array.isArray(content.subjectOptions) ? content.subjectOptions.join(', ') : ''}
          onChange={(e) => update('subjectOptions', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
          placeholder="Appointment, General Inquiry, Feedback"
        />
      </div>
      <div>
        <Label>Success Message</Label>
        <textarea
          value={content.successMessage || ''}
          onChange={(e) => update('successMessage', e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none text-sm"
          rows={2}
        />
      </div>
    </div>
  );
}

export function GoogleMapEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Google Maps Embed URL</Label>
        <Input value={content.embedUrl || ''} onChange={(e) => update('embedUrl', e.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." />
        <p className="text-xs text-gray-400 mt-1">Go to Google Maps → Share → Embed a map → Copy the src URL</p>
      </div>
      <div>
        <Label>Address Text</Label>
        <Input value={content.address || ''} onChange={(e) => update('address', e.target.value)} />
      </div>
    </div>
  );
}

export function FaqSectionEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <Label>FAQ Items</Label>
      <ArrayItemEditor
        items={content.items || []}
        fields={[
          { key: 'question', label: 'Question' },
          { key: 'answer', label: 'Answer', type: 'textarea' },
        ]}
        onChange={(items) => update('items', items)}
        addLabel="Add FAQ Item"
      />
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={content.showViewAll || false}
            onChange={(e) => update('showViewAll', e.target.checked)}
            className="rounded"
          />
          Show "View All FAQs" link
        </label>
        {content.showViewAll && (
          <Input
            value={content.viewAllLink || '/faq'}
            onChange={(e) => update('viewAllLink', e.target.value)}
            placeholder="/faq"
            className="w-40 text-sm"
          />
        )}
      </div>
    </div>
  );
}

export function TestimonialsEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input value={content.subtitle || ''} onChange={(e) => update('subtitle', e.target.value)} />
      </div>
      <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
        Testimonials are automatically pulled from your Testimonials Management. Go to Website → Testimonials to manage them.
      </p>
    </div>
  );
}

export function CtaBannerEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input value={content.subtitle || ''} onChange={(e) => update('subtitle', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Button Text</Label>
          <Input value={content.buttonText || ''} onChange={(e) => update('buttonText', e.target.value)} />
        </div>
        <div>
          <Label>Button Link</Label>
          <Input value={content.buttonLink || ''} onChange={(e) => update('buttonLink', e.target.value)} />
        </div>
      </div>
      <div>
        <Label>Background Color</Label>
        <div className="flex gap-2 items-center">
          <input type="color" value={content.backgroundColor || '#2D5A3D'} onChange={(e) => update('backgroundColor', e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
          <Input value={content.backgroundColor || '#2D5A3D'} onChange={(e) => update('backgroundColor', e.target.value)} className="w-32 text-sm" />
        </div>
      </div>
    </div>
  );
}

export function GalleryEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <Label>Images</Label>
      <ArrayItemEditor
        items={content.images || []}
        fields={[
          { key: 'url', label: 'Image URL' },
          { key: 'alt', label: 'Alt Text' },
          { key: 'caption', label: 'Caption' },
        ]}
        onChange={(images) => update('images', images)}
        addLabel="Add Image"
      />
    </div>
  );
}

export function VideoEmbedEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Video URL (YouTube embed URL)</Label>
        <Input value={content.videoUrl || ''} onChange={(e) => update('videoUrl', e.target.value)} placeholder="https://www.youtube.com/embed/..." />
      </div>
      <div>
        <Label>Description</Label>
        <textarea
          value={content.description || ''}
          onChange={(e) => update('description', e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none text-sm"
          rows={3}
        />
      </div>
    </div>
  );
}

export function RichTextEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Title (optional)</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Content (HTML supported)</Label>
        <textarea
          value={content.body || ''}
          onChange={(e) => update('body', e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none text-sm font-mono"
          rows={8}
          placeholder="<p>Write your content here...</p>"
        />
      </div>
    </div>
  );
}

export function WhatsappCtaEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input value={content.subtitle || ''} onChange={(e) => update('subtitle', e.target.value)} />
      </div>
      <div>
        <Label>Phone Number (with country code, no +)</Label>
        <Input value={content.phoneNumber || ''} onChange={(e) => update('phoneNumber', e.target.value)} placeholder="918001234567" />
      </div>
      <div>
        <Label>Button Text</Label>
        <Input value={content.buttonText || ''} onChange={(e) => update('buttonText', e.target.value)} placeholder="Chat on WhatsApp" />
      </div>
    </div>
  );
}

export function StatsCounterEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <Label>Stats Items</Label>
      <ArrayItemEditor
        items={content.items || []}
        fields={[
          { key: 'icon', label: 'Icon (emoji)' },
          { key: 'number', label: 'Number/Value' },
          { key: 'label', label: 'Label' },
        ]}
        onChange={(items) => update('items', items)}
        addLabel="Add Stat"
      />
    </div>
  );
}

export function BulletListEditor({ content, onChange }: EditorProps) {
  const update = (key: string, value: any) => onChange({ ...content, [key]: value });
  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input value={content.title || ''} onChange={(e) => update('title', e.target.value)} />
      </div>
      <div>
        <Label>Items (one per line)</Label>
        <textarea
          value={Array.isArray(content.items) ? content.items.join('\n') : ''}
          onChange={(e) => update('items', e.target.value.split('\n').filter(Boolean))}
          className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none text-sm"
          rows={6}
          placeholder="One item per line"
        />
      </div>
    </div>
  );
}

const editorMap: Record<string, React.FC<EditorProps>> = {
  HERO_BANNER: HeroBannerEditor,
  TEXT_IMAGE: TextImageEditor,
  VALUES_GRID: ValuesGridEditor,
  TEAM: TeamEditor,
  CONTACT_CARDS: ContactCardsEditor,
  CONTACT_FORM: ContactFormEditor,
  GOOGLE_MAP: GoogleMapEditor,
  FAQ_SECTION: FaqSectionEditor,
  TESTIMONIALS: TestimonialsEditor,
  CTA_BANNER: CtaBannerEditor,
  GALLERY: GalleryEditor,
  VIDEO_EMBED: VideoEmbedEditor,
  RICH_TEXT: RichTextEditor,
  WHATSAPP_CTA: WhatsappCtaEditor,
  STATS_COUNTER: StatsCounterEditor,
  BULLET_LIST: BulletListEditor,
};

export function getSectionEditor(type: string): React.FC<EditorProps> | null {
  return editorMap[type] || null;
}
