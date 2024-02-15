import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const PowerPointViewer = () => {
  const documents = [
    { uri: require("../files/document.pptx"), fileType: 'pptx', fileName: 'document.pptx' },
    // Ajoutez d'autres fichiers au besoin
  ];

  return (
    <div>
      <DocViewer documents={documents} />
    </div>
  );
};

export default PowerPointViewer;
