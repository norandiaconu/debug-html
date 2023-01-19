import { commands, ExtensionContext, Range, TextEditor, window } from "vscode";

let documentText: string;

export function activate(context: ExtensionContext) {
    console.log('Congratulations, your extension "debug-html" is now active!');

    let disposable = commands.registerCommand("debug-html.addDebug", async () => {
        const letter = await window.showInputBox({
            value: "",
            placeHolder: "Enter an letter to include in debug text (Optional)",
        });
        const editor = window.activeTextEditor;
        if (editor) {
            documentText = editor.document.getText();
            const regex = /\/div>/g;
            let count = 0;
            while (regex.exec(documentText) !== null) count++;
            for (let i = 1; i <= count; i++) replaceOccurrence(regex, i, "/div>." + letter + i + ".");
            editDocument(editor);
            window.showInformationMessage("Added " + count + " items");
        }
    });

    let disposable2 = commands.registerCommand("debug-html.removeDebug", () => {
        const editor = window.activeTextEditor;
        if (editor) {
            documentText = editor.document.getText();
            const regex = /\/div>(\n| |\r|\t)*\..?\d\./g;
            let count = 0;
            while (regex.exec(documentText) !== null) count++;
            for (let i = count; i >= 1; i--) replaceOccurrence(regex, i, "/div>");
            editDocument(editor);
            window.showInformationMessage("Deleted " + count + " items");
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

function editDocument(editor: TextEditor) {
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    let textRange = new Range(editor.document.lineAt(0).range.start, lastLine.range.end);
    editor.edit((textEditorEdit) => {
        textEditorEdit.replace(textRange, documentText);
    });
}

export function deactivate() {}
