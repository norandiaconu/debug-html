import * as vscode from "vscode";

let documentText: string;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "debug-html" is now active!');

    let disposable = vscode.commands.registerCommand("debug-html.addDebug", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            documentText = editor.document.getText();
            const regex = /\/div>/g;
            let count = 0;
            while (regex.exec(documentText) !== null) count++;
            for (let i = 1; i <= count; i++) replaceOccurrence(regex, i, "/div>." + i + ".");
            editDocument(editor);
            vscode.window.showInformationMessage("Added " + count + " items");
        }
    });

    let disposable2 = vscode.commands.registerCommand("debug-html.removeDebug", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            documentText = editor.document.getText();
            const regex = /\/div>(\n| |\r|\t)*\.\d\./g;
            let count = 0;
            while (regex.exec(documentText) !== null) count++;
            for (let i = count; i >= 1; i--) replaceOccurrence(regex, i, "/div>");
            editDocument(editor);
            vscode.window.showInformationMessage("Deleted " + count + " items");
        }
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}

function replaceOccurrence(regex: RegExp, whichDiv: number, replace: string): string {
    let checkDiv = 0;
    documentText = documentText.replace(regex, function (match) {
        checkDiv++;
        if (checkDiv === whichDiv) return replace;
        return match;
    });
    return "";
}

function editDocument(editor: vscode.TextEditor) {
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    let textRange = new vscode.Range(editor.document.lineAt(0).range.start, lastLine.range.end);
    editor.edit((textEditorEdit) => {
        textEditorEdit.replace(textRange, documentText);
    });
}

export function deactivate() {}
