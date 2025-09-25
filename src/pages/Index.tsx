import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PoetryCard } from "@/components/PoetryCard";
import { ThemeFilter } from "@/components/ThemeFilter";
import { PoetryGenerator } from "@/components/PoetryGenerator";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Music, BookOpen, Zap } from "lucide-react";
import apoloHero from "@/assets/apolo-hero.jpg";

interface Poetry {
  id: string;
  title: string;
  content: string;
  theme: string;
}

const Index = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [poetries, setPoetries] = useState<Poetry[]>([]);
  const { toast } = useToast();

  // Simulação de geração de poesia (em produção, conectaria com a API do Apolo)
  const generatePoetry = async (prompt: string, theme: string) => {
    setIsGenerating(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Exemplo de poesia gerada
    const examplePoetries = {
      "Amor": {
        title: "Coração em Versos",
        content: `No silêncio da noite estrelada,\nTeu nome ecoa em minha alma,\nComo melodia encantada\nQue acalma e abraça com calma.\n\nEm cada verso que escrevo,\nTua essência se faz presente,\nAmor que nunca esquecerei,\nPaixão eternamente ardente.`
      },
      "Natureza": {
        title: "Canção da Terra",
        content: `O vento sussurra segredos\nEntre as folhas do carvalho,\nEnquanto o sol dourado espalha\nSeus raios pelos campos verdes.\n\nA natureza dança em harmonia,\nCada flor um verso novo,\nCada riacho uma melodia\nQue embala o coração do povo.`
      },
      "Melancolia": {
        title: "Reflexões do Crepúsculo",
        content: `No crepúsculo da existência,\nReflito sobre o que foi,\nPalavras não ditas ficaram,\nSonhos que o tempo levou.\n\nMas na melancolia encontro\nBeleza em cada lembrança,\nPois até na dor mais profunda\nHá poesia e esperança.`
      }
    };

    const newPoetry: Poetry = {
      id: Date.now().toString(),
      title: examplePoetries[theme as keyof typeof examplePoetries]?.title || "Versos Inspirados",
      content: examplePoetries[theme as keyof typeof examplePoetries]?.content || `Inspirado em "${prompt}"\n\nVersos fluem como rio,\nPalavras dançam no ar,\nApolo tece a magia\nQue só a poesia pode dar.`,
      theme
    };

    setPoetries(prev => [newPoetry, ...prev]);
    setIsGenerating(false);
    
    toast({
      title: "Poesia criada!",
      description: "Apolo teceu versos inspirados em sua alma.",
    });
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
                <img 
                  src={apoloHero} 
                  alt="Apolo - Deus da Poesia" 
                  className="w-full h-auto rounded-2xl shadow-elegant"
                />
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

          <ThemeFilter 
            selectedTheme={selectedTheme}
            onThemeSelect={setSelectedTheme}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <PoetryGenerator
                theme={selectedTheme}
                onGenerate={generatePoetry}
                isGenerating={isGenerating}
              />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {isGenerating && (
                <PoetryCard
                  title="Criando..."
                  content=""
                  theme={selectedTheme}
                  isGenerating={true}
                />
              )}
              
              {poetries.map((poetry) => (
                <PoetryCard
                  key={poetry.id}
                  title={poetry.title}
                  content={poetry.content}
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