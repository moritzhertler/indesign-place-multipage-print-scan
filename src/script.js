main();

function main() {
    // make sure that user interaction (display of dialogs, etc.) is turned on.
    app.scriptPreferences.userInteractionLevel =
        UserInteractionLevels.interactWithAll;

    const pdfFile = File.openDialog("Choose a PDF File");
    if (pdfFile === "" || pdfFile === null) {
        return;
    }

    var document;
    var page;
    if (app.documents.length != 0) {
        document = selectDocument();
    }

    if (document === undefined || document === "") {
        document = app.documents.add();
    }

    if (document.pages.length <= 1) {
        page = document.pages.item(0);
    } else {
        page = selectPage(document);
    }

    placePDF(document, page, pdfFile);
}

function selectDocument() {
    const documentNames = new Array();
    documentNames.push("New Document");

    for (var i = 0; i < app.documents.length; i++) {
        documentNames.push(app.documents.item(i).name);
    }

    const selectDocumentDialog = app.dialogs.add({
        name: "Select a Document",
        canCancel: false,
    });
    const column = selectDocumentDialog.dialogColumns.add();
    const row = column.dialogRows.add();

    const innerColumn1 = row.dialogColumns.add();
    innerColumn1.staticTexts.add({
        staticLabel: "Place PDF in:",
    });

    const innerColumn2 = row.dialogColumns.add();
    const selectDocumentDropdown = innerColumn2.dropdowns.add({
        stringList: documentNames,
        selectedIndex: 0,
    });

    const result = selectDocumentDialog.show();
    if (!result) {
        selectDocumentDialog.destroy();
        return "";
    }

    var document;
    if (selectDocumentDropdown.selectedIndex === 0) {
        document = app.documents.add();
    } else {
        document = app.documents.item(selectDocumentDropdown.selectedIndex - 1);
    }
    selectDocumentDialog.destroy();

    return document;
}

function selectPage(document) {
    const pageNames = new Array();
    for (var i = 0; i < document.pages.length; i++) {
        pageNames.push(document.pages.item(i).name);
    }
    var selectPageDialog = app.dialogs.add({
        name: "Select a Page",
        canCancel: false,
    });

    const column = selectPageDialog.dialogColumns.add();
    const row = column.dialogRows.add();
    const innerColumn1 = row.dialogColumns.add();
    innerColumn1.staticTexts.add({
        staticLabel: "Place PDF on:",
    });

    const innerColumn2 = row.dialogColumns.add();
    const selectPageDropdown = innerColumn2.dropdowns.add({
        stringList: pageNames,
        selectedIndex: 0,
    });

    selectPageDialog.show();
    const page = document.pages.item(selectPageDropdown.selectedIndex);
    selectPageDialog.destroy();

    return page;
}

function placePDF(document, page, pdfFile) {
}

function placeLeftHalf(destinationPage, pdfFile, pdfPageNumber) {
    const placedPDF = placePDFPage(destinationPage, pdfFile, pdfPageNumber);
    const geometricBounds = placedPDF.parent.geometricBounds;
    const width = geometricBounds[3] - geometricBounds[1];
    geometricBounds[3] -= width / 2;
    placedPDF.parent.geometricBounds = geometricBounds;
}

function placeRightHalf(destinationPage, pdfFile, pdfPageNumber) {
    const placedPDF = placePDFPage(destinationPage, pdfFile, pdfPageNumber);
    const geometricBounds = placedPDF.parent.geometricBounds;
    const width = geometricBounds[3] - geometricBounds[1];
    geometricBounds[1] += width / 2;
    placedPDF.parent.geometricBounds = geometricBounds;
    placedPDF.parent.move(undefined, [-width, 0]);
}

function placePDFPage(destinationPage, pdfFile, pdfPageNumber) {
    app.pdfPlacePreferences.pageNumber = pdfPageNumber;
    return destinationPage.place(pdfFile, [0, 0])[0];
}
