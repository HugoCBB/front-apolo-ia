import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PoetryCard } from "@/components/PoetryCard";
import { PoetryGenerator } from "@/components/PoetryGenerator";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Music, BookOpen, Zap } from "lucide-react";

interface Poetry {
  id: string;
  titulo: string;
  poema: string;
  estilo: string;
  theme: string;
}

const Index = () => {
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [poetries, setPoetries] = useState<Poetry[]>([]);
  const { toast } = useToast();

  const generatePoetry = async (message: string) => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('https://api-apolo-ia.onrender.com/api/v1/poetry/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar poesia');
      }

      const data = await response.json();
      
      const newPoetry: Poetry = {
        id: Date.now().toString(),
        titulo: data.titulo,
        poema: data.poema,
        estilo: data.estilo,
        theme: message
      };

      setPoetries(prev => [newPoetry, ...prev]);
      
      toast({
        title: "Poesia criada!",
        description: "Apolo teceu versos inspirados em sua alma.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar poesia",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-90"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Music className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Powered by AI</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  <span className="apolo-glow">Apolo</span>
                  <br />
                  <span className="text-3xl md:text-5xl text-muted-foreground">
                    Deus da Poesia
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-lg">
                  Desperte o poeta que há em você. Apolo, inspirado no deus grego das artes, 
                  transforma suas emoções em versos únicos e inesquecíveis.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-accent hover:opacity-90 transition-opacity"
                  onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Começar a Criar
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Ver Exemplos
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">Temas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">✨</div>
                  <div className="text-sm text-muted-foreground">IA Criativa</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">📜</div>
                  <div className="text-sm text-muted-foreground">Únicos</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="apolo-float">
                <div className="w-full h-96 rounded-2xl shadow-elegant bg-gradient-accent flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-white" />
                    <h3 className="text-2xl font-bold text-white">Apolo IA</h3>
                    <p className="text-white/80">Criando poesias únicas</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-accent rounded-full blur-xl opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="py-20">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Crie Sua Poesia
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Escolha um tema que toque sua alma e deixe Apolo transformar suas ideias em versos eternos.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <PoetryGenerator
                onGenerate={generatePoetry}
                isGenerating={isGenerating}
              />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {isGenerating && (
                <PoetryCard
                  title="Criando..."
                  content=""
                  theme="Criando..."
                  isGenerating={true}
                />
              )}
              
              {poetries.map((poetry) => (
                <PoetryCard
                  key={poetry.id}
                  title={poetry.titulo}
                  content={poetry.poema}
                  theme={poetry.theme}
                />
              ))}
              
              {poetries.length === 0 && !isGenerating && (
                <div className="text-center py-12 text-muted-foreground">
                  <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Suas poesias aparecerão aqui...</p>
                  <p className="text-sm">Escolha um tema e comece a criar!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-apolo-surface/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Por que escolher Apolo?
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">IA Avançada</h4>
              <p className="text-muted-foreground">
                Tecnologia de ponta que compreende emoções e cria versos únicos para cada inspiração.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Temas Variados</h4>
              <p className="text-muted-foreground">
                Explore amor, natureza, melancolia e muitos outros temas para expressar seus sentimentos.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Criação Instantânea</h4>
              <p className="text-muted-foreground">
                Receba suas poesias em segundos, prontas para tocar corações e inspirar almas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;