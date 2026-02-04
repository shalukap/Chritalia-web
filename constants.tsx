
import React from 'react';
import { Truck, Globe, MapPin, Zap, ShieldCheck, Clock, UserCheck, Activity } from 'lucide-react';
import { NavItem, ServiceItem, Testimonial, KPI } from './types';

export const BRAND_NAME = "Chritalia SAS";
export const BRAND_LOCATION = "Verona, Italy";

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Coverage', href: '/#coverage' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'domestic',
    title: 'Domestic Road Transport',
    description: 'Reliable shipment and delivery across all Italian regions with optimized regional hubs.',
    icon: <MapPin className="w-8 h-8" />
  },
  {
    id: 'international',
    title: 'International Road Transport',
    description: 'Extensive European network covering major trade routes with full compliance to EU standards.',
    icon: <Globe className="w-8 h-8" />
  },
  {
    id: 'logistics',
    title: 'Logistics & Route Optimization',
    description: 'Advanced planning to reduce travel time, fuel consumption, and operational costs.',
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: 'express',
    title: 'Time-Critical Deliveries',
    description: 'High-priority express solutions for urgent freight that requires immediate dispatch.',
    icon: <Zap className="w-8 h-8" />
  }
];

export const TRUST_BADGES = [
  { label: 'On-time delivery', icon: <Clock className="w-5 h-5" /> },
  { label: 'EU standards', icon: <ShieldCheck className="w-5 h-5" /> },
  { label: 'Professional drivers', icon: <UserCheck className="w-5 h-5" /> },
  { label: 'Continuous monitoring', icon: <Activity className="w-5 h-5" /> },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    company: 'Verona Manufacturing Ltd.',
    content: 'Chritalia SAS has been our reliable partner for over 3 years. Their precision and care for our goods are unmatched in the region.',
    rating: 5
  },
  {
    id: '2',
    name: 'Elena Bianchi',
    company: 'EuroDistribution Gmbh',
    content: 'Professionalism at its best. They handle our cross-border logistics with absolute transparency and consistent on-time delivery.',
    rating: 5
  },
  {
    id: '3',
    name: 'Giovanni Verde',
    company: 'Italian Retail Solutions',
    content: 'The tracking updates and route optimization they provide have significantly reduced our logistics overhead. Highly recommended.',
    rating: 4
  }
];

export const KPIs: KPI[] = [
  { label: 'Deliveries Yearly', value: '4,000', suffix: '+' },
  { label: 'On-Time Rate', value: '99.8', suffix: '%' },
  { label: 'Cities Covered', value: '24', suffix: '' },
  { label: 'Professional Drivers', value: '10', suffix: '+' }
];

export const ABOUT_TEXT = `Chritalia SAS is a leading company in road transport and logistics services based in Verona, Italy. We are your trusted partner for domestic and international road transportation, offering reliable, efficient, and on-time delivery solutions throughout Italy and Europe.

With years of experience and a team of highly professional drivers, Chritalia SAS ensures every transport request is handled with speed, precision, and care. Our shipment and delivery processes are carefully organized to optimize routes, reduce travel time, and guarantee cost-effective logistics solutions.

Every step of the operation is continuously monitored and managed by our skilled professionals to ensure maximum safety, flexibility, and accessibility. At Chritalia SAS, we are committed to providing transparent, professional, and customer-focused transport services that meet the highest European standards.`;
