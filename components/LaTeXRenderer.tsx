import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

interface LaTeXRendererProps {
  latex: string;
  style?: any;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
}

export default function LaTeXRenderer({ 
  latex, 
  style, 
  fontSize = 16, 
  textColor = '#1f2937',
  backgroundColor = '#ffffff'
}: LaTeXRendererProps) {
  // HTML template com MathJax para renderizar LaTeX
  const mathJaxHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <script>
        window.MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                processEscapes: true,
                processEnvironments: true
            },
            options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
            },
            startup: {
                ready: () => {
                    MathJax.startup.defaultReady();
                    // Ajustar altura após renderização
                    setTimeout(() => {
                        const height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
                        window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'resize',
                            height: height + 20
                        }));
                    }, 100);
                }
            }
        };
    </script>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            font-size: ${fontSize}px;
            color: ${textColor};
            background-color: ${backgroundColor};
            margin: 0;
            padding: 10px;
            text-align: center;
            line-height: 1.4;
            overflow-x: auto;
            min-height: fit-content;
        }
        
        .math-container {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 8px;
            background-color: ${backgroundColor};
            border: 1px solid #e5e7eb;
            margin: 4px;
            min-width: 100%;
            box-sizing: border-box;
        }
        
        mjx-container {
            font-size: ${fontSize}px !important;
            color: ${textColor} !important;
        }
        
        mjx-math {
            font-size: inherit !important;
        }
        
        /* Responsivo para telas menores */
        @media (max-width: 480px) {
            body {
                font-size: ${Math.max(14, fontSize - 2)}px;
            }
            
            mjx-container {
                font-size: ${Math.max(14, fontSize - 2)}px !important;
            }
        }
    </style>
</head>
<body>
    <div class="math-container">
        $$${latex.replace(/\\\\/g, '\\\\\\\\')}$$
    </div>
</body>
</html>`;

  const [webViewHeight, setWebViewHeight] = React.useState(80);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'resize' && data.height) {
        setWebViewHeight(Math.max(60, Math.min(data.height, 200))); // Altura entre 60 e 200px
      }
    } catch (error) {
      console.log('Erro ao processar mensagem do WebView:', error);
    }
  };

  return (
    <View style={[{
      height: webViewHeight,
      backgroundColor: backgroundColor,
      borderRadius: 8,
      overflow: 'hidden',
      marginVertical: 4,
    }, style]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: mathJaxHTML }}
        style={{
          backgroundColor: 'transparent',
          flex: 1,
        }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        mixedContentMode="compatibility"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP error: ', nativeEvent);
        }}
      />
    </View>
  );
}

// Componente para exibir múltiplas fórmulas LaTeX
export function LaTeXFormulaList({ 
  formulas, 
  title, 
  fontSize = 16,
  textColor = '#1f2937',
  backgroundColor = '#ffffff'
}: { 
  formulas: string[], 
  title?: string,
  fontSize?: number,
  textColor?: string,
  backgroundColor?: string
}) {
  return (
    <View style={{ marginVertical: 16 }}>
      {title && (
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: textColor,
          marginBottom: 12,
          textAlign: 'center'
        }}>
          {title}
        </Text>
      )}
      {formulas.map((formula, index) => (
        <LaTeXRenderer 
          key={index} 
          latex={formula}
          fontSize={fontSize}
          textColor={textColor}
          backgroundColor={backgroundColor}
          style={{ marginBottom: 8 }}
        />
      ))}
    </View>
  );
}