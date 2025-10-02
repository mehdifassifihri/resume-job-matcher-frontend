import React from 'react'
import { Building2 } from 'lucide-react'

// Import company logos
import googleLogo from '../assets/google.png'
import metaLogo from '../assets/meta.png'
import amazonLogo from '../assets/amazon.png'
import netflixLogo from '../assets/netflix.png'
import ibmLogo from '../assets/ibm.png'
import bcgLogo from '../assets/bcg.png'

// Company data with imported logos
const companies = [
  {
    id: 1,
    name: 'Google',
    logo: googleLogo
  },
  {
    id: 2,
    name: 'Meta',
    logo: metaLogo
  },
  {
    id: 3,
    name: 'Amazon',
    logo: amazonLogo
  },
  {
    id: 4,
    name: 'Netflix',
    logo: netflixLogo
  },
  {
    id: 5,
    name: 'IBM',
    logo: ibmLogo
  },
  {
    id: 6,
    name: 'BCG',
    logo: bcgLogo
  }
]

export function CompanyCarousel() {
  return (
    <section data-section="companies" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects matching the design system */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 via-accent/3 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/2 right-0 w-64 h-64 bg-warning/5 rounded-full blur-3xl" />
      
      {/* Additional floating elements for visual richness */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-20 w-24 h-24 bg-warning/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-28 h-28 bg-info/8 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins-bold text-neutral-text-primary mb-6">
            Success Stories Across Top Companies
          </h2>
          <p className="text-xl font-poppins text-neutral-text-secondary max-w-3xl mx-auto">
            Thousands of professionals have found their dream jobs at leading companies using our AI-powered resume optimization
          </p>
        </div>

        {/* Companies Grid - Static Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex justify-center"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 border-neutral-border/20 hover:border-primary/30 hover:bg-white/20 hover:bg-neutral-surface/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-center justify-center group hover:scale-105 w-full">
                {/* Company Logo */}
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-16 h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}