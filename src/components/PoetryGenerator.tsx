import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

interface PoetryGeneratorProps {
  onGenerate: (message: string) => void;
  isGenerating: boolean;
}

export const PoetryGenerator = ({ onGenerate, isGenerating }: PoetryGeneratorProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!message.trim()) {
      toast({
        title: "Tema necessário",
        description: "Por favor, digite o tema ou estilo de poesia desejado.",
        variant: "destructive",
      });
      return;
    }

    onGenerate(message.trim());
  };

  return (
    <Card className="shadow-elegant border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Sparkles className="w-5 h-5 text-primary" />
          Inspire Apolo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme" className="text-sm font-medium text-foreground">
            Tema ou Estilo da Poesia
          </Label>
          <Textarea
            id="theme"
            placeholder="Digite o tema ou estilo desejado... (ex: amor melancólico, natureza primaveril, esperança urbana, mistério noturno...)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
        
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-accent hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Criando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Poesia
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};