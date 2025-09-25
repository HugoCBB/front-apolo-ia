import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Wand2, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PoetryGeneratorProps {
  theme: string;
  onGenerate: (prompt: string, theme: string) => void;
  isGenerating: boolean;
}

export const PoetryGenerator = ({ theme, onGenerate, isGenerating }: PoetryGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!theme) {
      toast({
        title: "Selecione um tema",
        description: "Por favor, escolha um tema antes de gerar a poesia.",
        variant: "destructive",
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Adicione uma inspiração",
        description: "Escreva algumas palavras ou frases para inspirar Apolo.",
        variant: "destructive",
      });
      return;
    }

    onGenerate(prompt, theme);
  };

  return (
    <Card className="bg-apolo-surface border-apolo-glow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Wand2 className="w-5 h-5" />
          Inspire Apolo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium text-foreground">
            Sua inspiração:
          </label>
          <Textarea
            id="prompt"
            placeholder={`Escreva algumas palavras ou frases sobre ${theme.toLowerCase()}... O que você gostaria que Apolo explorasse em seus versos?`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] bg-background border-border focus:border-primary resize-none"
          />
        </div>
        
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-accent hover:opacity-90 transition-opacity"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Criando poesia...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Poesia
            </>
          )}
        </Button>

        {theme && (
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span>Tema selecionado:</span>
            <span className="text-primary font-medium">{theme}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};