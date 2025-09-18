import { Check, Star, Sparkles } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
  buttonVariant?: "default" | "outline"
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "Free",
    description: "Perfect for getting started and testing our services",
    features: [
      "3 CV adaptations per month",
      "Limited job discovery (5 per week)",
      "Access to basic recommendations",
      "Community support"
    ],
    buttonText: "Start free",
    buttonVariant: "outline"
  },
  {
    name: "Pro",
    price: "$10",
    description: "For serious job seekers",
    features: [
      "Unlimited adaptations",
      "Advanced recommendations",
      "Application tracking (dashboard + history)",
      "Detailed compatibility analysis",
      "Priority support",
      "PDF export of adapted CVs"
    ],
    popular: true,
    buttonText: "Choose Pro",
    buttonVariant: "default"
  }
]

export function PricingPlans() {
  return (
    <section data-section="pricing" data-pricing-section className="relative py-24 overflow-hidden">
      {/* Background with blur effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-surface/80 to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-20 w-24 h-24 bg-warning/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-28 h-28 bg-info/8 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Pricing
          </Badge>
          <h2 className="text-heading-1 font-poppins-bold text-neutral-text-primary mb-4">
            Choose your plan
          </h2>
          <p className="text-body-large font-poppins-medium text-neutral-text-secondary max-w-2xl mx-auto">
            Flexible options for all needs, from free trial to premium experience
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-xl border border-white/20 ${
                plan.popular 
                  ? 'ring-2 ring-primary shadow-2xl scale-105 bg-gradient-to-b from-primary/10 to-transparent' 
                  : 'hover:shadow-2xl hover:border-primary/30 hover:bg-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default" className="flex items-center gap-1 bg-gradient-to-r from-primary to-accent text-white border-0 shadow-lg">
                    <Star className="w-3 h-3 text-white" />
                    Most popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-heading-2 font-poppins-bold text-neutral-text-primary">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-poppins-bold text-neutral-text-primary">
                    {plan.price}
                  </span>
                  {plan.price !== "Free" && (
                    <span className="text-neutral-text-secondary font-poppins-medium">/month</span>
                  )}
                </div>
                <CardDescription className="text-base mt-2 font-poppins-medium">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-text-secondary font-poppins">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className="w-full font-poppins-medium"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-neutral-text-secondary mb-4 font-poppins-medium">
            All plans include a 30-day satisfaction guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-text-secondary font-poppins">
            <span>✓ No hidden fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Free updates</span>
          </div>
        </div>
      </div>
    </section>
  )
}
