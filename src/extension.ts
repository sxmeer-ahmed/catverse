import * as vscode from "vscode";
import { cry, happy, intro, stop, ambu, dead} from "./player";

let value = true;
export function activate(context: vscode.ExtensionContext) {
  console.log("Extension activated");

  const provider = new CustomSidebarViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      CustomSidebarViewProvider.viewType,
      provider
    )
  );

  let errorLensEnabled: boolean = true;

  let disposableEnableErrorLens = vscode.commands.registerCommand(
    "ErrorLens.enable",
    () => {
      errorLensEnabled = true;

      const activeTextEditor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;
      if (activeTextEditor) {
        updateDecorationsForUri(activeTextEditor.document.uri);
      }
    }
  );

  context.subscriptions.push(disposableEnableErrorLens);

  let disposableDisableErrorLens = vscode.commands.registerCommand(
    "ErrorLens.disable",
    () => {
      errorLensEnabled = false;

      const activeTextEditor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;
      if (activeTextEditor) {
        updateDecorationsForUri(activeTextEditor.document.uri);
      }
    }
  );

  context.subscriptions.push(disposableDisableErrorLens);

  vscode.languages.onDidChangeDiagnostics(
    (diagnosticChangeEvent) => {
      onChangedDiagnostics(diagnosticChangeEvent);
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidOpenTextDocument(
    (textDocument) => {
      updateDecorationsForUri(textDocument.uri);
    },
    null,
    context.subscriptions
  );

  vscode.window.onDidChangeActiveTextEditor(
    (textEditor) => {
      if (textEditor === undefined) {
        return;
      }
      updateDecorationsForUri(textEditor.document.uri);
    },
    null,
    context.subscriptions
  );

  function onChangedDiagnostics(
    diagnosticChangeEvent: vscode.DiagnosticChangeEvent
  ) {
    if (!vscode.window) {
      return;
    }

    const activeTextEditor: vscode.TextEditor | undefined =
      vscode.window.activeTextEditor;
    if (!activeTextEditor) {
      return;
    }

    for (const uri of diagnosticChangeEvent.uris) {
      if (uri.fsPath === activeTextEditor.document.uri.fsPath) {
        updateDecorationsForUri(uri);
        break;
      }
    }
  }

  function updateDecorationsForUri(uriToDecorate: vscode.Uri) {
    if (!uriToDecorate) {
      return;
    }

    if (uriToDecorate.scheme !== "file") {
      return;
    }

    if (!vscode.window) {
      return;
    }

    const activeTextEditor: vscode.TextEditor | undefined =
      vscode.window.activeTextEditor;
    if (!activeTextEditor) {
      return;
    }

    if (!activeTextEditor.document.uri.fsPath) {
      return;
    }

  }
}

class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
  public static viewType = "catverse.openview";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case "alert":
          if (value) {
            stop();
          }
          value = !value;
          return;
      }
    }, undefined);

    webviewView.webview.html = this.getHtmlContent(webviewView.webview,"intro.gif");
    intro();
    
    let flag1 = true,flag2=true,flag3=true,flag4=true;
    setTimeout(() => {
      setInterval(() => {
        let nerr = getNumErrors();
        if(nerr===0)
        {
             if(flag1)
             {
              webviewView.webview.html = this.getHtmlContent(webviewView.webview,"happy.gif");
              value?happy():null;
              flag1=false;flag2=true,flag3=true,flag4=true;
             }
             else
             {
              webviewView.webview.html = this.getHtmlContent(webviewView.webview,"sleeping.png");
             }
        }

        if(nerr>0 && nerr<=5)
        {
             if(flag2)
             {
              webviewView.webview.html = this.getHtmlContent(webviewView.webview,"bancatcry.gif");
              value?cry():null;
              flag1=true;flag2=false,flag3=true,flag4=true;
             }
             else
             {
              webviewView.webview.html = this.getHtmlContent(webviewView.webview,"bancatrun.gif");
             }
        }

        if(nerr>5 && nerr<=10)
        {
             if(flag3)
             {
              webviewView.webview.html = this.getHtmlContent(webviewView.webview,"appcarrot.gif");
              value?ambu():null;
              flag1=true;flag2=true,flag3=false,flag4=true;
             }
             else
             {
              webviewView.webview.html = this.getHtmlContent(webviewView.webview,"appcatrun.gif");
             }
        }

        if(nerr>10)
        {
             if(flag4)
             {
              webviewView.webview.html = this.getHtmlContent(webviewView.webview,"dead.png");
              value?dead():null;
              flag1=true;flag2=true,flag3=true,flag4=false;
             }
             else
             {
              webviewView.webview.html = this.getHtmlContent(webviewView.webview,"max.gif");
             }
        }
      }, 7000);
    }, 5500);
  }

  private getHtmlContent(webview: vscode.Webview, cat: string): string {
    const catUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", cat)
    );
    
    return (cat==="intro.gif")?introHtml(catUri):getHtml(catUri);
  }
}

function getHtml(cat: any) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <style>
      

.root {
display: flex;
flex-direction: column;
align-items: center;
}

.computerContainer {
width: 250px;
height: 250px;
display: flex;
flex-direction: column;
background-color: #b9ab84;
border-radius: 24px 24px 0 0;
}

.bottomDecor {
display: flex;
justify-content: flex-end;
}
.screenContainer {

flex: 0 0 63%;
border-radius: 20px 20px 0 0;
background: #cfc19a;
padding: 5px;
}

.screenFrame {
height: 100%;
background-color: #b9ab84;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 20px 20px;
}

.screen {
background-color: #222;
height: 95%;
width: 95%;
margin: 5px;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
}

.bodyDecor {
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between;
background: #cfc19a;
border-radius: 0 0 24px 24px;
}

.floppyDriveContainer {
flex: 2;
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: flex-end;
}

.logoContainer {


padding-left : 35px;

}

 .Mover {
              position: relative;
              top: -27px;
                  padding-left: 130px;
              }
              



.terminal {
height: 245px;
flex: 0 0 95%;
overflow-y: auto;
font-size: 12px;
display: flex;
justify-content: center;
align-items: center;
}
html {
box-sizing: border-box;
font-family: 'Arial', sans-serif;
font-size: 100%;
}
*, *:before, *:after {
box-sizing: inherit;
}



/* Switch starts here */
.rocker {
display: inline-block;
position: relative;

font-size: 2em;
font-weight: bold;
text-align: center;
text-transform: uppercase;
color: #888;
width: 7em;
height: 4em;
overflow: hidden;
border-bottom: 0.5em solid #eee;
}

.rocker-small {
font-size: 0.45em; /* Sizes the switch */
margin: 1em;
}

.rocker::before {
content: "";
position: absolute;
top: 0.5em;
left: 0;
right: 0;
bottom: 0;
background-color: #999;
border: 0.5em solid #eee;
border-bottom: 0;
}

.rocker input {
opacity: 0;
width: 0;
height: 0;
}

.switch-left,
.switch-right {
cursor: pointer;
position: absolute;
display: flex;
align-items: center;
justify-content: center;
height: 2.5em;
width: 3em;
transition: 0.2s;
}

.switch-left {
height: 2.4em;
width: 2.75em;
left: 0.85em;
bottom: 0.4em;
background-color: #ddd;
transform: rotate(15deg) skewX(15deg);
}

.switch-right {
right: 0.5em;
bottom: 0;
background-color: #bd5757;
color: #fff;
}

.switch-left::before,
.switch-right::before {
content: "";
position: absolute;
width: 0.4em;
height: 2.45em;
bottom: -0.45em;
background-color: #ccc;
transform: skewY(-65deg);
}

.switch-left::before {
left: -0.4em;
}

.switch-right::before {
right: -0.375em;
background-color: transparent;
transform: skewY(65deg);
}

input:checked + .switch-left {
background-color: #0084d0;
color: #fff;
bottom: 0px;
left: 0.5em;
height: 2.5em;
width: 3em;
transform: rotate(0deg) skewX(0deg);
}

input:checked + .switch-left::before {
background-color: transparent;
width: 3.0833em;
}

input:checked + .switch-left + .switch-right {
background-color: #ddd;
color: #888;
bottom: 0.4em;
right: 0.8em;
height: 2.4em;
width: 2.75em;
transform: rotate(-15deg) skewX(-15deg);
}

input:checked + .switch-left + .switch-right::before {
background-color: #ccc;
}

/* Keyboard Users */
input:focus + .switch-left {
color: #333;
}

input:checked:focus + .switch-left {
color: #fff;
}

input:focus + .switch-left + .switch-right {
color: #fff;
}

input:checked:focus + .switch-left + .switch-right {
color: #333;
}

.table {
    width: 80px;
    height: 16px;
    background-color: #d4e5ff; }
    .table .monitor-wrapper {
      background: #050321;
      width: 77px;
      height: 14px;
      box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.3); }
      .table .monitor-wrapper .monitor {
        width: 75px;
        height: 13px;
        background-color: #344151;
        overflow: hidden;
        white-space: nowrap;
        box-shadow: inset 0px 5px 10px 2px rgba(0, 0, 0, 0.3); }
        .table .monitor-wrapper .monitor p {
          font-family: 'VT323', monospace;
          font-size: 9px;
          position: relative;
          top : -7px;
          display: inline-block;
          animation: move 5s infinite linear;
          color: #EBB55F; }
  
  @keyframes move {
    from {
      left: 80px;
      }
    to {
      left: -150px; } }


        </style>
        
  </head>

  <body>
  <section class="wrapper">
  <body>
<div class="root">
<main class="computerContainer">
  <section class="screenContainer">
    <div class="screenFrame">
      <div class="screen">
        <div class="terminal">
        <img src = ${cat} ></img>
        </div>
      </div>
    </div>
  </section>
  <section class="bodyDecor">
  <div class="logoContainer">

  <label class="rocker rocker-small" >
<input type="checkbox" onchange="handleClick()" id="myCheckbox"  >
<span class="switch-left"  >On</span>
<span class="switch-right" >Off</span>
</label>
</div>
<div class="Mover">
                              <div class="table" >
      <div class="monitor-wrapper center">
          <div class="monitor center">
              <p>Number of Errors : ${getNumErrors()}</p>
          </div>
   </div>
      </div>
      </div>
</section>
  <section class="bottomDecor">
  </section>
</main>
</div>
</body>
  </section>

  
<script>
function handleClick() {
const vscode = acquireVsCodeApi();
vscode.postMessage({
  command: 'alert'
}); 
}
var myCheckbox = document.getElementById("myCheckbox");

if (${value}) {
  myCheckbox.checked = true;
} else {
  myCheckbox.checked = false;
}
</script>
  </body>

</html>
  
  `;
}

function introHtml(cat:any)
{
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <style>
              body {
                  margin: 0;
                
              }
  
              .root {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
              }
  
              .computerContainer {
                  width: 250px;
                  height: 250px;
                  display: flex;
                  flex-direction: column;
                  background-color: #b9ab84;
                  border-radius: 24px 24px 0 0;
              }
  
              .bottomDecor {
                  display: flex;
                  justify-content: flex-end;
              }
              .screenContainer {
                  flex: 0 0 63%;
                  border-radius: 20px 20px 0 0;
                  background: #cfc19a;
                  padding: 5px;
              }
  
              .screenFrame {
                  height: 100%;
                  background-color: #b9ab84;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  border-radius: 20px 20px;
              }
  
              .screen {
                  background-image: url("${cat}");
                  background-size: 240px 250px;
                  height: 95%;
                  width: 95%;
                  margin: 5px;
                  border-radius: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
  
              .bodyDecor {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  background: #cfc19a;
                  border-radius: 0 0 24px 24px;
              }
  
              
  
              .logoContainer {
                  padding-left: 35px;
              }
        .Mover {
              position: relative;
              top: -27px;
                  padding-left: 130px;
              }
              
             
  
              .terminal {
                  height: 245px;
                  flex: 0 0 95%;
                  overflow-y: auto;
                  font-size: 12px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
              html {
                  box-sizing: border-box;
                  font-family: "Arial", sans-serif;
                  font-size: 100%;
              }
              *,
              *:before,
              *:after {
                  box-sizing: inherit;
              }
  
              /* Switch starts here */
              .rocker {
                  display: inline-block;
                  position: relative;
  
                  font-size: 2em;
                  font-weight: bold;
                  text-align: center;
                  text-transform: uppercase;
                  color: #888;
                  width: 7em;
                  height: 4em;
                  overflow: hidden;
                  border-bottom: 0.5em solid #eee;
              }
  
              .rocker-small {
                  font-size: 0.45em; /* Sizes the switch */
                  margin: 1em;
              }
  
              .rocker::before {
                  content: "";
                  position: absolute;
                  top: 0.5em;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: #999;
                  border: 0.5em solid #eee;
                  border-bottom: 0;
              }
  
              .rocker input {
                  opacity: 0;
                  width: 0;
                  height: 0;
              }
  
              .switch-left,
              .switch-right {
                  cursor: pointer;
                  position: absolute;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 2.5em;
                  width: 3em;
                  transition: 0.2s;
              }
  
              .switch-left {
                  height: 2.4em;
                  width: 2.75em;
                  left: 0.85em;
                  bottom: 0.4em;
                  background-color: #ddd;
                  transform: rotate(15deg) skewX(15deg);
              }
  
              .switch-right {
                  right: 0.5em;
                  bottom: 0;
                  background-color: #bd5757;
                  color: #fff;
              }
  
              .switch-left::before,
              .switch-right::before {
                  content: "";
                  position: absolute;
                  width: 0.4em;
                  height: 2.45em;
                  bottom: -0.45em;
                  background-color: #ccc;
                  transform: skewY(-65deg);
              }
  
              .switch-left::before {
                  left: -0.4em;
              }
  
              .switch-right::before {
                  right: -0.375em;
                  background-color: transparent;
                  transform: skewY(65deg);
              }
  
              input:checked + .switch-left {
                  background-color: #0084d0;
                  color: #fff;
                  bottom: 0px;
                  left: 0.5em;
                  height: 2.5em;
                  width: 3em;
                  transform: rotate(0deg) skewX(0deg);
              }
  
              input:checked + .switch-left::before {
                  background-color: transparent;
                  width: 3.0833em;
              }
  
              input:checked + .switch-left + .switch-right {
                  background-color: #ddd;
                  color: #888;
                  bottom: 0.4em;
                  right: 0.8em;
                  height: 2.4em;
                  width: 2.75em;
                  transform: rotate(-15deg) skewX(-15deg);
              }
  
              input:checked + .switch-left + .switch-right::before {
                  background-color: #ccc;
              }
  
              /* Keyboard Users */
              input:focus + .switch-left {
                  color: #333;
              }
  
              input:checked:focus + .switch-left {
                  color: #fff;
              }
  
              input:focus + .switch-left + .switch-right {
                  color: #fff;
              }
  
              input:checked:focus + .switch-left + .switch-right {
                  color: #333;
              }
            
  
  
  .table {
    width: 80px;
    height: 16px;
    background-color: #d4e5ff; }
    .table .monitor-wrapper {
      background: #050321;
      width: 77px;
      height: 14px;
      box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.3); }
      .table .monitor-wrapper .monitor {
        width: 75px;
        height: 13px;
        background-color: #344151;
        overflow: hidden;
        white-space: nowrap;
        box-shadow: inset 0px 5px 10px 2px rgba(0, 0, 0, 0.3); }
        .table .monitor-wrapper .monitor p {
          font-family: 'VT323', monospace;
          font-size: 9px;
          position: relative;
          top : -7px;
          display: inline-block;
          animation: move 5s infinite linear;
          color: #EBB55F; }
  
  @keyframes move {
    from {
      left: 80px;
      }
    to {
      left: -150px; } }
  
          </style>
      </head>
  
      <body>
          <section class="wrapper">
              <body>
                  <div class="root">
                      <main class="computerContainer">
                          <section class="screenContainer">
                              <div class="screenFrame">
                                  <div class="screen">
                                      <div class="terminal"></div>
                                      
                                  </div>
                              </div>
                          </section>
                          <section class="bodyDecor">
                              <div class="logoContainer">
                                  <label class="rocker rocker-small">
                                      <input type="checkbox" onchange="handleClick()" id="myCheckbox" />
                                      <span class="switch-left">On</span>
                                      <span class="switch-right">Off</span>
                                  </label>
                              </div>
                             <div class="Mover">
                              <div class="table" >
      <div class="monitor-wrapper center">
          <div class="monitor center">
              <p>Welcome to  CatVerse Made by Sameer Ahmed :)</p>
          </div>
   </div>
      </div>
                          </section>
                          <section class="bottomDecor"></section>
                          
                      </main>
                  </div>
              </body>
             
          </section>
        
          <script>
              function handleClick() {
              const vscode = acquireVsCodeApi();
              vscode.postMessage({
                command: 'alert'
              });
              }
              var myCheckbox = document.getElementById("myCheckbox");
  
              if (${value}) {
                myCheckbox.checked = true;
              } else {
                myCheckbox.checked = false;
              }
          </script>
      </body>
        
  </div>
  </html>
  
  
  
  `;
}

function getNumErrors(): number {
  const activeTextEditor: vscode.TextEditor | undefined =
    vscode.window.activeTextEditor;
  if (!activeTextEditor) {
    return 0;
  }
  const document: vscode.TextDocument = activeTextEditor.document;

  let numErrors = 0;

  let aggregatedDiagnostics: any = {};
  let diagnostic: vscode.Diagnostic;

  for (diagnostic of vscode.languages.getDiagnostics(document.uri)) {
    let key = "line" + diagnostic.range.start.line;

    if (aggregatedDiagnostics[key]) {
      aggregatedDiagnostics[key].arrayDiagnostics.push(diagnostic);
    } else {
      aggregatedDiagnostics[key] = {
        line: diagnostic.range.start.line,
        arrayDiagnostics: [diagnostic],
      };
    }

    switch (diagnostic.severity) {
      case 0:
        numErrors += 1;
        break;
    }
  }

  return numErrors;
}

export function deactivate() {}
