import React, { useState, useEffect } from 'react';
import { apiService } from '../api/services';
import { SiteSettings } from '../types';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader, Container, Button, IconWrapper } from '../components/common';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    apiService.getSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error("Contact settings fetch failed", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement actual form submission API logic
    alert(t('contact.successMsg'));
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={t('contact.title')}
        subtitle={t('contact.sub')}
      />

      <div className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.getInTouch')}</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <IconWrapper icon={<Phone className="w-6 h-6" />} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('contact.phoneTitle')}</h3>
                    <p className="text-gray-600 mb-2">{t('contact.phoneDesc')}</p>
                    <div className="flex flex-col gap-1">
                      {settings?.phone && (
                        <a href={`tel:${settings.phone}`} className="text-green-700 font-bold hover:text-green-800 text-lg">{settings.phone}</a>
                      )}
                      {settings?.phone2 && (
                        <a href={`tel:${settings.phone2}`} className="text-green-700 font-bold hover:text-green-800 text-lg">{settings.phone2}</a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <IconWrapper icon={<Mail className="w-6 h-6" />} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('contact.emailTitle')}</h3>
                    <p className="text-gray-600 mb-2">{t('contact.emailDesc')}</p>
                    {settings?.email && (
                      <a href={`mailto:${settings.email}`} className="text-green-700 font-bold hover:text-green-800 text-lg">{settings.email}</a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <IconWrapper icon={<MapPin className="w-6 h-6" />} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('contact.officeTitle')}</h3>
                    <p className="text-gray-600 leading-relaxed max-w-sm">
                      {settings?.address || ""}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.sendMessage')}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">{t('contact.fullName')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">{t('contact.phoneNumber')}</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      placeholder={t('contact.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">{t('contact.emailAddr')}</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">{t('contact.howHelp')}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-y"
                    placeholder={t('contact.howHelpPlaceholder')}
                  ></textarea>
                </div>
                <Button 
                  type="submit"
                  fullWidth
                  className="rounded-xl"
                  size="lg"
                >
                  <Send className="w-5 h-5" />
                  {t('contact.sendBtn')}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
