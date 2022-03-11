import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }

    html, body, span, figure, p, h1, h2, h3, h4, h5, h6, button, a, input {
        margin: 0;
        padding: 0;
        line-height: 1.5;
        font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', Pretendard, Roboto, 'Noto Sans KR', 'Segoe UI', 'Malgun Gothic', sans-serif;
        -webkit-text-size-adjust: 100%;
        color: #495057;
    }

    main {
        display: block;
        padding: 48px 6%;
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
    }

    *::selection {
        background: #e9ecef;
        text-shadow: none;
    }

    *::-moz-selection {
        background: #e9ecef;
        text-shadow: none;
    }

    *::-webkit-selection {
        background: #e9ecef;
        text-shadow: none;
    }

    .intro-animation {
        animation: fadein 0.75s ease-out;
        -moz-animation: fadein 0.75s ease-out;
        -webkit-animation: fadein 0.75s ease-out;
        -o-animation: fadein 0.75s ease-out;
    }

    @keyframes fadein-dropdown {
        0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -10%, 0);
        -ms-transform: translate3d(0, -10%, 0);
        transform: translate3d(0, -10%, 0);
        }
        100% {
        opacity: 1;
        -webkit-transform: none;
        -ms-transform: none;
        transform: none;
        }
    }

    @keyframes fadein {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
    }

    @-moz-keyframes fadein {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
    }

    @-webkit-keyframes fadein {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
    }

    @-o-keyframes fadein {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
    }
`;

export default GlobalStyle;
