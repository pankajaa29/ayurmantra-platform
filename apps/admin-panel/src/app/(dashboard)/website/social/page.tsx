'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Star, Instagram, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { socialApi } from '@/lib/api';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SocialSettings {
  googleReviews: {
    enabled: boolean;
    placeId: string;
    apiKey: string;
    maxReviews: number;
  };
  instagram: {
    enabled: boolean;
    username: string;
    accessToken: string;
    maxPosts: number;
  };
}

export default function SocialIntegrationsPage() {
  const [settings, setSettings] = useState<SocialSettings>({
    googleReviews: {
      enabled: false,
      placeId: '',
      apiKey: '',
      maxReviews: 6,
    },
    instagram: {
      enabled: false,
      username: '',
      accessToken: '',
      maxPosts: 6,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAccessToken, setShowAccessToken] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await socialApi.getSettings();
      if (response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      toast.error('Failed to load social settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await socialApi.updateSettings(settings);
      toast.success('Social integration settings saved');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const updateGoogleReviews = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      googleReviews: { ...prev.googleReviews, [field]: value },
    }));
  };

  const updateInstagram = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      instagram: { ...prev.instagram, [field]: value },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-900">Social Integrations</h1>
          <p className="text-gray-600 mt-1">
            Connect Google Reviews and Instagram to showcase on your website
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-teal-700 hover:bg-teal-800"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Reviews Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Google Reviews</CardTitle>
                  <CardDescription>Display Google reviews on your website</CardDescription>
                </div>
              </div>
              <Switch
                checked={settings.googleReviews.enabled}
                onCheckedChange={(checked) => updateGoogleReviews('enabled', checked)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {settings.googleReviews.enabled ? (
              <>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Currently showing mock reviews. To display real reviews, 
                    you need a Google Places API key. Learn more in the{' '}
                    <a 
                      href="https://developers.google.com/maps/documentation/places/web-service/overview" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Google Places API documentation
                    </a>.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeId">Google Place ID</Label>
                  <Input
                    id="placeId"
                    value={settings.googleReviews.placeId}
                    onChange={(e) => updateGoogleReviews('placeId', e.target.value)}
                    placeholder="ChIJ... (your Google Place ID)"
                  />
                  <p className="text-xs text-gray-500">
                    Find your Place ID using the{' '}
                    <a 
                      href="https://developers.google.com/maps/documentation/places/web-service/place-id" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-600 underline"
                    >
                      Place ID Finder
                    </a>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">Google API Key</Label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.googleReviews.apiKey}
                      onChange={(e) => updateGoogleReviews('apiKey', e.target.value)}
                      placeholder="Your Google Places API key"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxReviews">Maximum Reviews to Display</Label>
                  <Select
                    value={settings.googleReviews.maxReviews.toString()}
                    onValueChange={(value) => updateGoogleReviews('maxReviews', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 reviews</SelectItem>
                      <SelectItem value="6">6 reviews</SelectItem>
                      <SelectItem value="9">9 reviews</SelectItem>
                      <SelectItem value="12">12 reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-3">Preview (Mock Data)</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Priya Sharma', rating: 5, text: 'Amazing Ayurvedic treatment! The doctors are truly knowledgeable.' },
                      { name: 'Rajesh Kumar', rating: 5, text: 'The herbal remedies worked wonders for my digestive issues.' },
                    ].map((review, i) => (
                      <div key={i} className="bg-white p-3 rounded border">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-xs font-medium text-teal-700">
                            {review.name[0]}
                          </div>
                          <span className="text-sm font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, j) => (
                              <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Enable Google Reviews to display them on your website</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instagram Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Instagram Feed</CardTitle>
                  <CardDescription>Display Instagram posts on your website</CardDescription>
                </div>
              </div>
              <Switch
                checked={settings.instagram.enabled}
                onCheckedChange={(checked) => updateInstagram('enabled', checked)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {settings.instagram.enabled ? (
              <>
                <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                  <p className="text-sm text-pink-800">
                    <strong>Note:</strong> Currently showing mock posts. To display real Instagram posts, 
                    you need an Instagram Basic Display API access token. Learn more in the{' '}
                    <a 
                      href="https://developers.facebook.com/docs/instagram-basic-display-api" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Instagram API documentation
                    </a>.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Instagram Username</Label>
                  <Input
                    id="username"
                    value={settings.instagram.username}
                    onChange={(e) => updateInstagram('username', e.target.value)}
                    placeholder="@yourclinic"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessToken">Instagram Access Token</Label>
                  <div className="relative">
                    <Input
                      id="accessToken"
                      type={showAccessToken ? 'text' : 'password'}
                      value={settings.instagram.accessToken}
                      onChange={(e) => updateInstagram('accessToken', e.target.value)}
                      placeholder="Your Instagram API access token"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAccessToken(!showAccessToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showAccessToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Generate a token from the{' '}
                    <a 
                      href="https://developers.facebook.com/tools/explorer" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-600 underline"
                    >
                      Facebook Graph API Explorer
                    </a>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPosts">Maximum Posts to Display</Label>
                  <Select
                    value={settings.instagram.maxPosts.toString()}
                    onValueChange={(value) => updateInstagram('maxPosts', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 posts</SelectItem>
                      <SelectItem value="6">6 posts</SelectItem>
                      <SelectItem value="9">9 posts</SelectItem>
                      <SelectItem value="12">12 posts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-3">Preview (Mock Data)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-gradient-to-br from-teal-100 to-amber-100 rounded border flex items-center justify-center">
                        <Instagram className="w-6 h-6 text-teal-600/50" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Instagram className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Enable Instagram to display your feed on the website</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* How to Integrate Section */}
      <Card className="bg-gradient-to-r from-teal-50 to-amber-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-900">How to Set Up Real Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-teal-800">Google Reviews Setup</h4>
              <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">Google Cloud Console</a></li>
                <li>Create a new project or select existing one</li>
                <li>Enable the Google Places API</li>
                <li>Create API credentials (API Key)</li>
                <li>Find your Place ID using the Place ID Finder</li>
                <li>Enter both in the fields above</li>
              </ol>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-teal-800">Instagram Setup</h4>
              <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">Facebook for Developers</a></li>
                <li>Create a new app and add Instagram Basic Display</li>
                <li>Add your Instagram account as a test user</li>
                <li>Generate an access token</li>
                <li>Enter the token and your username above</li>
                <li>Note: Token expires every 60 days</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
