// js/utils.js - Configuração Tailwind com paleta "Velvet Memory" do DESIGN.md

tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface": "#fff8f7",
                    "surface-dim": "#e7d6d6",
                    "surface-bright": "#fff8f7",
                    "surface-container-lowest": "#ffffff",
                    "surface-container-low": "#fff0f0",
                    "surface-container": "#fceae9",
                    "surface-container-high": "#f6e4e4",
                    "surface-container-highest": "#f0dfde",
                    "on-surface": "#221919",
                    "on-surface-variant": "#504446",
                    "inverse-surface": "#382e2e",
                    "inverse-on-surface": "#feedec",
                    "outline": "#837376",
                    "outline-variant": "#d4c2c4",
                    "surface-tint": "#80515c",
                    "primary": "#80515c",
                    "on-primary": "#ffffff",
                    "primary-container": "#f4b8c4",
                    "on-primary-container": "#744651",
                    "inverse-primary": "#f3b7c3",
                    "secondary": "#a23c3f",
                    "on-secondary": "#ffffff",
                    "secondary-container": "#fd8181",
                    "on-secondary-container": "#73181f",
                    "tertiary": "#615e57",
                    "on-tertiary": "#ffffff",
                    "tertiary-container": "#ccc7bf",
                    "on-tertiary-container": "#56534c",
                    "error": "#ba1a1a",
                    "on-error": "#ffffff",
                    "error-container": "#ffdad6",
                    "on-error-container": "#93000a",
                    "primary-fixed": "#ffd9e0",
                    "primary-fixed-dim": "#f3b7c3",
                    "on-primary-fixed": "#32101a",
                    "on-primary-fixed-variant": "#653a44",
                    "secondary-fixed": "#ffdad8",
                    "secondary-fixed-dim": "#ffb3b1",
                    "on-secondary-fixed": "#410007",
                    "on-secondary-fixed-variant": "#832429",
                    "tertiary-fixed": "#e7e2d9",
                    "tertiary-fixed-dim": "#cbc6bd",
                    "on-tertiary-fixed": "#1d1b16",
                    "on-tertiary-fixed-variant": "#494640",
                    "background": "#fff8f7",
                    "on-background": "#221919",
                    "surface-variant": "#f0dfde"
            },
            "borderRadius": {
                    "sm": "0.25rem",
                    "DEFAULT": "0.5rem",
                    "md": "0.75rem",
                    "lg": "1rem",
                    "xl": "1.5rem",
                    "full": "9999px"
            },
            "spacing": {
                    "container-padding": "24px",
                    "sm": "12px",
                    "xl": "64px",
                    "grid-gutter": "16px",
                    "base": "8px",
                    "md": "24px",
                    "xs": "4px",
                    "lg": "40px"
            },
            "fontFamily": {
                    "headline-md": ["Plus Jakarta Sans"],
                    "body-md": ["Plus Jakarta Sans"],
                    "headline-lg": ["Plus Jakarta Sans"],
                    "label-sm": ["Plus Jakarta Sans"],
                    "label-lg": ["Plus Jakarta Sans"],
                    "body-lg": ["Plus Jakarta Sans"]
            }
          }
        }
      }
