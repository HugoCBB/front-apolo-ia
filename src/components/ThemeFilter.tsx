import { Badge } from "@/components/ui/badge";
import { Heart, Flower2, Cloud, Sun, Sword, Moon } from "lucide-react";

const themes = [
  { name: "Amor", icon: Heart, description: "Poesias românticas e apaixonadas" },
  { name: "Natureza", icon: Flower2, description: "Versos sobre paisagens e elementos naturais" },
  { name: "Melancolia", icon: Cloud, description: "Reflexões profundas e contemplativas" },
  { name: "Esperança", icon: Sun, description: "Versos inspiradores e otimistas" },
  { name: "Épico", icon: Sword, description: "Narrativas heroicas e grandiosas" },
  { name: "Místico", icon: Moon, description: "Poesias sobre mistérios e espiritualidade" },
];

interface ThemeFilterProps {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}

export const ThemeFilter = ({ selectedTheme, onThemeSelect }: ThemeFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Escolha um Tema</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isSelected = selectedTheme === theme.name;
          
          return (
            <button
              key={theme.name}
              onClick={() => onThemeSelect(theme.name)}
              className={`group p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-apolo-surface hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon 
                  className={`w-6 h-6 transition-colors ${
                    isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  }`} 
                />
                <span 
                  className={`text-sm font-medium transition-colors ${
                    isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                  }`}
                >
                  {theme.name}
                </span>
                <span className="text-xs text-muted-foreground text-center hidden md:block">
                  {theme.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};