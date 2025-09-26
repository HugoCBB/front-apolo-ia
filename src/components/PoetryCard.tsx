import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Heart, Sparkles } from "lucide-react";

interface PoetryCardProps {
  titulo: string;
  poema: string;
  tema: string;
  isGenerating?: boolean;
}

export const PoetryCard = ({ titulo, poema, tema, isGenerating = false }: PoetryCardProps) => {
  return (
    <Card className="bg-apolo-surface border-apolo-glow/20 hover:border-apolo-glow/40 transition-all duration-300 hover:shadow-glow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-primary" />
            {titulo}
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {tema}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Sparkles className="w-5 h-5 animate-spin text-primary" />
              <span>Apolo está criando sua poesia...</span>
            </div>
          </div>
        ) : (
          <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
            {poema}
          </div>
        )}
      </CardContent>
    </Card>
  );
};