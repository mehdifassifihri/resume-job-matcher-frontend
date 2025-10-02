import { CheckCircle, ArrowRight, Star } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { useNavigate } from "react-router-dom"

export function SuccessPage() {
  const navigate = useNavigate()

  const handleGoToHome = () => {
    navigate('/')
  }

  const handleGoToPricing = () => {
    navigate('/#pricing')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-3xl font-poppins-bold text-neutral-text-primary mb-2">
              Paiement réussi ! 🎉
            </CardTitle>
            <CardDescription className="text-lg font-poppins-medium text-neutral-text-secondary">
              Félicitations ! Votre abonnement Pro est maintenant actif.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-4 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-success" />
                <span className="font-poppins-bold text-neutral-text-primary">Abonnement Pro activé</span>
              </div>
              <p className="text-neutral-text-secondary font-poppins">
                Vous avez maintenant accès à toutes les fonctionnalités premium :
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-text-secondary font-poppins">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Adaptations illimitées de CV
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Recommandations avancées
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Suivi des candidatures
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Support prioritaire
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-poppins-bold text-neutral-text-primary mb-2">
                Prochaines étapes
              </h3>
              <p className="text-neutral-text-secondary font-poppins text-sm">
                Vous pouvez maintenant commencer à utiliser toutes les fonctionnalités premium. 
                Téléchargez votre CV et découvrez des emplois parfaitement adaptés à votre profil.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleGoToHome}
                className="flex-1 font-poppins-medium"
                size="lg"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
              <Button 
                onClick={handleGoToPricing}
                variant="outline"
                className="flex-1 font-poppins-medium"
                size="lg"
              >
                Voir les plans
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-neutral-text-secondary font-poppins">
            Un email de confirmation a été envoyé à votre adresse email.
          </p>
        </div>
      </div>
    </div>
  )
}


