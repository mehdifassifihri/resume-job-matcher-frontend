import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { useNavigate } from "react-router-dom"

export function CancelPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/#pricing')
  }

  const handleTryAgain = () => {
    navigate('/#pricing')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warning/5 via-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-warning" />
            </div>
            <CardTitle className="text-3xl font-poppins-bold text-neutral-text-primary mb-2">
              Paiement annulé
            </CardTitle>
            <CardDescription className="text-lg font-poppins-medium text-neutral-text-secondary">
              Votre paiement a été annulé. Aucun montant n'a été débité.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-warning/10 to-primary/10 rounded-lg p-4 border border-warning/20">
              <h3 className="font-poppins-bold text-neutral-text-primary mb-2">
                Que s'est-il passé ?
              </h3>
              <p className="text-neutral-text-secondary font-poppins text-sm">
                Vous avez annulé le processus de paiement ou une erreur s'est produite. 
                Votre carte n'a pas été débitée et aucun abonnement n'a été créé.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-poppins-bold text-neutral-text-primary mb-2">
                Vous pouvez toujours :
              </h3>
              <ul className="space-y-2 text-sm text-neutral-text-secondary font-poppins">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Essayer à nouveau avec un autre moyen de paiement
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Commencer avec le plan gratuit
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Contacter notre support si vous rencontrez des problèmes
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleTryAgain}
                className="flex-1 font-poppins-medium"
                size="lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer
              </Button>
              <Button 
                onClick={handleGoBack}
                variant="outline"
                className="flex-1 font-poppins-medium"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux plans
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-neutral-text-secondary font-poppins">
            Besoin d'aide ? Contactez notre support à{" "}
            <a href="mailto:support@resumejobmatcher.com" className="text-primary hover:underline">
              support@resumejobmatcher.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}



