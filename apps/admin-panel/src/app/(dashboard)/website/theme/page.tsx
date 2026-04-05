'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { themeApi } from '@/lib/api';
import { toast } from 'sonner';

interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  accent: string;
  accentDark: string;
  background: string;
  border: string;
  text: string;
  textLight: string;
}

interface Preset {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
}

const colorFields: { key: keyof ThemeColors; label: string; description: string }[] = [
  { key: 'primary', label: 'Primary', description: 'Main brand color (headers, buttons, accents)' },
  { key: 'primaryDark', label: 'Primary Dark', description: 'Darker shade for hover states' },
  { key: 'primaryLight', label: 'Primary Light', description: 'Lighter shade for subtle backgrounds' },
  { key: 'secondary', label: 'Secondary', description: 'Secondary accent (CTAs, links, highlights)' },
  { key: 'secondaryDark', label: 'Secondary Dark', description: 'Darker shade for hover' },
  { key: 'accent', label: 'Accent / Gold', description: 'Decorative accent (borders, badges, dividers)' },
  { key: 'accentDark', label: 'Accent Dark', description: 'Darker accent for hover' },
  { key: 'background', label: 'Background', description: 'Page background color' },
  { key: 'border', label: 'Border', description: 'Card borders and dividers' },
  { key: 'text', label: 'Text', description: 'Main text color' },
  { key: 'textLight', label: 'Text Light', description: 'Secondary/muted text' },
];

export default function ThemeManagementPage() {
  const [colors, setColors] = useState<ThemeColors>({
    primary: '#2D5A3D', primaryDark: '#1F4030', primaryLight: '#4A7C59',
    secondary: '#D4853C', secondaryDark: '#B86E2E',
    accent: '#D4AF37', accentDark: '#B8941F',
    background: '#F8F6F0', border: '#E8E2D5',
    text: '#1a2e1a', textLight: '#6b7280',
  });
  const [activePreset, setActivePreset] = useState('ayurvedic-classic');
  const [presets, setPresets] = useState<Preset[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    setLoading(true);
    try {
      const response = await themeApi.getSettings();
      if (response.data) {
        setColors(response.data.colors);
        setActivePreset(response.data.activePreset || '');
        setPresets(response.data.presets || []);
      }
    } catch {
      toast.error('Failed to load theme settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await themeApi.updateSettings({ colors, activePreset });
      toast.success('Theme saved! Refresh the website to see changes.');
      setHasChanges(false);
    } catch {
      toast.error('Failed to save theme');
    } finally {
      setSaving(false);
    }
  };

  const applyPreset = (preset: Preset) => {
    setColors({ ...preset.colors });
    setActivePreset(preset.id);
    setHasChanges(true);
  };

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
    setActivePreset('custom');
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-100 animate-pulse rounded w-48" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-900">Theme & Branding</h1>
          <p className="text-gray-600 mt-1">Customize your website's color palette</p>
        </div>
        <Button onClick={handleSave} disabled={saving || !hasChanges} className="bg-teal-700 hover:bg-teal-800">
          {saving ? 'Saving...' : hasChanges ? 'Save Theme' : 'Saved'}
        </Button>
      </div>

      {/* Color Palette Presets */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Palettes</h2>
        <p className="text-sm text-gray-500 mb-4">Choose a preset palette or customize individual colors below</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                activePreset === preset.id
                  ? 'border-teal-500 bg-teal-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm text-gray-900">{preset.name}</h3>
                {activePreset === preset.id && <Badge className="bg-teal-100 text-teal-700 text-xs">Active</Badge>}
              </div>
              <p className="text-xs text-gray-500 mb-3">{preset.description}</p>
              <div className="flex gap-1">
                {['primary', 'secondary', 'accent', 'background', 'border'].map((key) => (
                  <div
                    key={key}
                    className="w-8 h-8 rounded-lg border border-gray-200"
                    style={{ backgroundColor: (preset.colors as any)[key] }}
                    title={`${key}: ${(preset.colors as any)[key]}`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h2>
        <Card className="overflow-hidden">
          <div style={{ backgroundColor: colors.primary }} className="p-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Preview Badge
            </span>
            <h3 className="text-2xl font-bold text-white mt-3 font-serif">AyurMantra Healing Center</h3>
            <p className="text-white/80 text-sm mt-1">Ancient wisdom for modern wellness</p>
            <div className="flex gap-3 mt-4">
              <span className="px-6 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: colors.secondary, color: 'white' }}>
                Book Now
              </span>
              <span className="px-6 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: colors.accent, color: colors.primary }}>
                Learn More
              </span>
            </div>
          </div>
          <div style={{ backgroundColor: colors.background }} className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {['Authenticity', 'Compassion', 'Excellence'].map((v) => (
                <div key={v} className="rounded-xl p-4 text-center" style={{ backgroundColor: 'white', border: `1px solid ${colors.border}` }}>
                  <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                    <span className="text-white">🌿</span>
                  </div>
                  <h4 className="font-medium text-sm" style={{ color: colors.text }}>{v}</h4>
                  <p className="text-xs mt-1" style={{ color: colors.textLight }}>Description text here</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-sm font-medium" style={{ color: colors.secondary }}>Link Text →</a>
              <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: colors.accent + '20', color: colors.accent }}>Badge</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Individual Color Editors */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Colors</h2>
        <p className="text-sm text-gray-500 mb-4">Fine-tune individual colors. Editing any color switches to "Custom" mode.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorFields.map((field) => (
            <Card key={field.key}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="color"
                    value={colors[field.key]}
                    onChange={(e) => updateColor(field.key, e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-0.5"
                  />
                  <div className="flex-1">
                    <Label className="text-sm font-medium">{field.label}</Label>
                    <p className="text-xs text-gray-400">{field.description}</p>
                  </div>
                </div>
                <Input
                  value={colors[field.key]}
                  onChange={(e) => updateColor(field.key, e.target.value)}
                  className="text-sm font-mono"
                  placeholder="#000000"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
