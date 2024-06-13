import React, { useState } from "react";
import { PrimaryButton, Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { Button, Position, Tooltip } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import {
  highlightPlugin,
  Trigger,
  MessageIcon,
} from "@react-pdf-viewer/highlight";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import samplePDF from "./assets/nda.pdf";

const PdfView = () => {
  const [highlights, setHighlights] = useState([
    {
      // Increase the id manually
      id: 1,
      content: "place",
      highlightAreas:
        // { pageIndex: 1 }
        [
          {
            height: 1.2955684137721621,
            left: 74.84587635788469,
            pageIndex: 0,
            top: 26.221764874576156,
            width: 3.9911177927659067,
          },
        ],

      quote: "place",
    },
  ]);
  const renderHighlightTarget = (props) => (
    <div
      style={{
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
        zIndex: 100,
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: "100px" }}>Add a note</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );

  const [message, setMessage] = React.useState("");
  const [notes, setNotes] = React.useState([]);
  let noteId = notes.length;

  const renderHighlightContent = (props) => {
    const addNote = () => {
      // Only add message if it's not empty
      if (message !== "") {
        const note = {
          // Increase the id manually
          id: ++noteId,
          content: message,
          highlightAreas: props.highlightAreas,
          quote: props.selectedText,
        };
        setNotes(notes.concat([note]));

        // Close the form
        props.cancel();
      }
    };

    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "2px",
          padding: "8px",
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          zIndex: 10,
        }}
        className="tolTip"
      >
        <div>
          <textarea
            rows={3}
            style={{
              border: "1px solid rgba(0, 0, 0, .3)",
            }}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "8px",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <PrimaryButton onClick={addNote}>Add</PrimaryButton>
          </div>
          <Button onClick={props.cancel}>Cancel</Button>
        </div>
      </div>
    );
  };

  const highlightPluginInstance = highlightPlugin({
    // trigger: Trigger.None,
    renderHighlightTarget,
    renderHighlightContent,

    renderHighlights: (props) => {
      console.log(props);
      return (
        <div>
          {highlights.map((note) => (
            <React.Fragment key={note.id}>
              {note.highlightAreas
                // Filter all highlights on the current page
                .filter((area) => area.pageIndex === props.pageIndex)
                .map((area, idx) => {
                  console.log("map", area);
                  return (
                    <div
                      key={idx}
                      style={Object.assign(
                        {},
                        {
                          background: "yellow",
                          opacity: 0.4,
                        },
                        props.getCssProperties(area, props.rotation)
                      )}
                    />
                  );
                })}
            </React.Fragment>
          ))}
        </div>
      );
    },
  });
  console.log(notes);

  return (
    <div className="App">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "750px",
            width: "800px",
          }}
        >
          <Viewer fileUrl={samplePDF} plugins={[highlightPluginInstance]} />
        </div>
      </Worker>
    </div>
  );
};

export default PdfView;
