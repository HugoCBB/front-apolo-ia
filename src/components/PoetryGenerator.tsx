import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Send } from "lucide-react";

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
    setMessage(""); // Limpa o campo após enviar
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-elegant border-primary/20 bg-background/95 backdrop-blur">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Converse com Apolo</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Descreva o tema, estilo ou sentimento que deseja expressar em versos
              </p>
            </div>
            
            <div className="relative">
              <Textarea
                placeholder="Ex: 'Crie um poema melancólico sobre o outono' ou 'Quero versos românticos sobre o primeiro encontro' ou 'Poesia épica sobre um herói solitário'..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[120px] text-base resize-none pr-16 bg-background border-2 border-border focus:border-primary transition-colors"
                disabled={isGenerating}
              />
              
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !message.trim()}
                size="sm"
                className="absolute bottom-3 right-3 bg-gradient-accent hover:opacity-90 transition-opacity rounded-full w-10 h-10 p-0"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Pressione Enter para enviar, Shift+Enter para nova linha</span>
              <span className={message.length > 500 ? "text-destructive" : ""}>
                {message.length}/1000
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};