import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/Styles/terminal_gateway.css';

const TerminalGateway = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isBooting, setIsBooting] = useState(true);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const banner = [
    "   _____ __  ______  _______   ______  __  __ ___    ____ ",
    "  / ___// / / / __ \\/ ____/ | / / __ \\/ / / //   |  / __ \\",
    "  \\__ \\/ / / / /_/ / __/ /  |/ / / / / /_/ // /| | / /_/ /",
    " ___/ / /_/ / _, _/ /___/ /|  / /_/ / __  // ___ |/ _, _/ ",
    "/____/\\____/_/ |_/_____/_/ |_/_____/_/ /_//_/  |_/_/ |_|  ",
    "",
    "Welcome to my terminal portfolio. (Version 1.3.1)",
    "----",
    // "This project's source code can be found in this project's GitHub repo.",
    // "----",
    "For a list of available commands, type 'help'.",
    ""
  ];

  const manPortrait = `
                  ,##, ,eew,
                ,###############C
               ###############@@@@@
              7#####^^~^7W7^~^@####
              @@@6\`         ^@@@^
               ##^, , , ,    , ^##^
               ,,@@@@@@@"#######--
               .''555" '5555b|
               T"@  . .^,mg,@,*
                  %p||' ' ',#'
                    ^Wp  ,#T
                   :b''@@h^}
                    '    'b 3-
                . <'  p  ^v  #   b   *
               {      }  #^GpGb  [
               C      3  * @#######N1
               '      '   ^@##b    ($    !
  `;

  const commands = {
    help: () => [
      "about          - about Surendhar S",
      "gui            - go to my portfolio in GUI",
      "projects       - view projects that I've coded",
      "socials        - check out my social accounts",
      "echo [text]    - print out anything",
      "clear          - clear the terminal",
      "whoami         - about current user",
      "date           - print system time",
      "welcome        - display hero section"
    ],
    about: () => [
      "NAME: SURENDHAR S",
      "BIO: Passionate about building high-performance systems and cinematic web experiences.",
      "LOC: INDIA [0x01_NODE]"
    ],
    projects: () => [
      "FEATURED PROJECTS:",
      "  1. SHOPEASE       - React-based e-commerce engine",
      "  2. TECHMONITOR    - Dev activity tracking system",
      "  3. FASHION STORE  - Fashion UI module",
      "  4. WEATHER APP    - Real-time API service"
    ],
    socials: () => [
      "NETWORK NODES:",
      "  GITHUB: github.com/surendharsundar793-prog",
      "  LINKEDIN: linkedin.com/in/surendhar-s-8a40b6312/",
      "  INSTAGRAM: @_surendharr"
    ],
    whoami: () => ["USER: GUEST", "PERMISSIONS: READ_ONLY_ACCESS"],
    date: () => [`SYS_TIME: ${new Date().toLocaleString()}`],
    welcome: () => banner,
    gui: () => {
      setHistory(prev => [...prev, "> BOOTING PORTFOLIO... "]);
      setTimeout(() => window.open('/portfolio', '_blank'), 1000);
      return [];
    }
  };

  useEffect(() => {
    // Initial boot sequence
    const bootSequence = async () => {
      const lines = [
        "BOOTING_SUREN_OS_v4.2...",
        "LOADING_KERNEL_MODULES... [OK]",
        "INITIALIZING_VIRTUAL_TERMINAL... [OK]",
        "ESTABLISHING_SECURE_HANDSHAKE... [OK]",
        ""
      ];
      
      for (const line of lines) {
        setHistory(prev => [...prev, line]);
        await new Promise(r => setTimeout(r, 150));
      }
      setHistory(prev => [...prev, ...banner]);
      setIsBooting(false);
    };

    bootSequence();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      const prompt = `visitor@terminal.surendhar.dev:~$ ${input}`;
      
      setHistory(prev => [...prev, prompt]);
      
      if (trimmedInput !== '') {
        setCmdHistory(prev => [input, ...prev]);
        setHistoryIndex(-1);
      }

      if (trimmedInput === 'clear') {
        setHistory([]);
      } else if (trimmedInput.startsWith('echo ')) {
        const echoMsg = input.substring(5);
        setHistory(prev => [...prev, echoMsg]);
      } else if (trimmedInput === 'echo') {
        setHistory(prev => [...prev, ""]);
      } else if (commands[trimmedInput]) {
        const output = commands[trimmedInput]();
        if (output.length > 0) {
          setHistory(prev => [...prev, ...output]);
        }
      } else if (trimmedInput !== '') {
        setHistory(prev => [...prev, `COMMAND_NOT_FOUND: ${trimmedInput}. Type 'HELP' for assistance.`]);
      }
      
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="terminal-gateway-page" onClick={focusInput}>
      <div className="terminal-scanline"></div>
      <div className="terminal-container" ref={containerRef} data-lenis-prevent>
        <div className="terminal-history">
          {history.map((line, i) => {
            let className = 'terminal-line';
            if (line.includes('visitor@')) {
              className += ' line-prompt';
            } else if (line.includes(' - ') && !line.includes('Guest@') && !line.includes('visitor@')) {
              className += ' line-help';
            } else if (line.includes('|') || line.includes('/') || line.includes('$') || line.includes('\\') || line.includes('#') || line.includes('_')) {
              className += ' line-ascii';
            } else if (line.includes("WELCOME TO SURENDHAR'S")) {
              className += ' line-welcome';
            } else {
              className += ' line-output';
            }

            return (
              <div key={i} className={className}>
                {className.includes('line-prompt') ? (
                  <span className="terminal-prompt">
                    <span className="prompt-user">guest</span>
                    <span className="prompt-at">@</span>
                    <span className="prompt-host">terminal.surendhar.dev</span>
                    <span className="prompt-path">:~$</span>
                    <span className="prompt-input"> {line.split(':~$')[1]}</span>
                  </span>
                ) : className.includes('line-help') ? (
                  <div className="help-listing">
                    <div className="help-command">{line.split(' - ')[0].trim()}</div>
                    <div className="help-desc">- {line.split(' - ')[1].trim()}</div>
                  </div>
                ) : line.includes('GitHub repo') ? (
                  <>
                    {line.split('GitHub repo')[0]}
                    <span className="text-orange">GitHub repo</span>
                    {line.split('GitHub repo')[1]}
                  </>
                ) : line}
              </div>
            );
          })}
        </div>
        
        {!isBooting && (
          <div className="terminal-input-line">
            <span className="terminal-prompt">
              <span className="prompt-user">guest</span>
              <span className="prompt-at">@</span>
              <span className="prompt-host">terminal.surendhar.dev</span>
              <span className="prompt-path">:~$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="terminal-main-input"
            />
          </div>
        )}

        <div className="terminal-ascii-portrait">
          <pre>{manPortrait}</pre>
        </div>
      </div>
      
      <div className="terminal-hints">
        {/* Tab or Ctrl + i =&gt; autocompletes the command (Not implemented) <br /> */}
        Up Arrow / Down Arrow =&gt; cycle through previous commands <br />
        Type 'gui' to enter the main portfolio
      </div>
    </div>
  );
};

export default TerminalGateway;
