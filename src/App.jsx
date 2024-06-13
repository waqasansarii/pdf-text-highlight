import { useRef } from "react";
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import "./App.css";
import PdfView from "./Pdf";
import res from './assets/nda.pdf'
import { PDFHighlight } from "@pdf-highlight/react-pdf-highlight";
import PDF from "./Test";
gsap.registerPlugin(useGSAP);

export default function App() {
  const container = useRef();

  // let divArray = [1,2,3,4,5,6,7,8].map((val)=>(
  //   <div key={val} className="box">{val}</div>
  // ))

  // useGSAP(
  //   () => {
  //     let boxes = gsap.utils.toArray('.box')
  //     // gsap code here...
  //     gsap.to(boxes, {
  //       // rotation: 180,
  //       // duration: 2.5,
  //       // ease: "power1.out",
  //       // y: -50,
  //       // repeatDelay:2,
  //       // repeat: -1
  //       y:100,
  //       ease:'back.inOut',
  //       stagger:0.2
  //     }); // <-- automatically reverted
  //   },
  //   { scope: container }
  // ); // <-- scope for selector text (optional)

  useGSAP(
    () => {
      let boxes = gsap.utils.toArray(".box");
      // gsap code here...
      // gsap.to(boxes, {
      //   duration: 2.5,
      //   y: 100,
      //   ease: "back.inOut",
      //   autoAlpha: true,

      //   stagger: {
      //     // each:true,
      //     each: .5,
      //     // from:3
      //     // grid: [7,15],
      //     from: 'end',
      //     // axis: "y",
      //     // ease: "power3.inOut",
      //     // amount: 1.5,
      //   },
      // }); // <-- automatically reverted

      // gsap.to(boxes, {
      //   duration: 2.5,
      //   y: 100,
      //   ease: "back.inOut",
      //   autoAlpha: true,

      //   stagger: {
      //     // each:true,
      //     each: 1.5,
      //     // from:3
      //     // grid: [7,15],
      //     from: 'end',
      //     // axis: "y",
      //     // ease: "power3.inOut",
      //     // amount: 1.5,
      //   },
      // }); 

      // gsap.to(boxes, {
      //   duration: 2.5,
      //   y: 100,
      //   ease: "back.inOut",
      //   // autoAlpha: 0,
      //   scale:.1,
      //   yoyo:true,

      //   stagger: {
      //     // each:true,
      //     each: .1,
      //     // from:3
      //     // grid: [7,15],
      //     from: 'center',
      //     // axis: "y",
      //     // ease: "power3.inOut",
      //     // amount: 1.5,
      //   },
      // }); 

      gsap.to(boxes, {
        duration: 2.5,
        y: 100,
        ease: "back.inOut",
        // autoAlpha: 0,
        scale:.1,
        yoyo:true,
        repeat:-1, // animation repeat

        stagger: {
          // each:true,
          // each: .1,
          // from:3
          // grid: [7,15],
          from: 'center', // animation will start from center
          // axis: "y",
          // ease: "power3.inOut",
          amount: 1.5,
          grid:'auto' // grid use for 2d
        },
      }); 
    },
    { scope: container }
  );

  return (
    <div ref={container} className="app">
      {/* <div className="box">Hello</div> */}
      {/* {[1, 2, 3, 4, 5, 6, 7].map((val) => (
        <div key={val} className="box">
          {val}
        </div>
      ))} */}
      {/* <PdfView /> */}
      <PDFHighlight
      width={800}
      allowHtml

      onStartLoad={() => {
        console.log("start loading");
      }}
      onLoaded={() => {
        console.log("end loading");
      }}
      keywords={[
        // `facilisis odio sed mi.\nCurabitur suscipit. Nullam vel nisi. Etiam semper ipsum ut lectus.`,
        // `Pellentesque sit amet lectus. Praesent pulvin`,
        // `THIS NON-DISCLOSURE AGREEMENTIS ENTERED INTO AS OF 5thJUNE 2024 BY AND BETWEEN:`
        // `The Parties intend to enterinto discussions to explore the possibility of undertaking the Proposed Transaction(as defined below) (the “Purpose”), and each Party (whether itself and/or through its Representatives) hasor will be disclosing Confidential Information (as defined below) to the other Party`,
        `information relating directly or indirectly to the Proposed Transaction and if applicable, its business,including but not limited to revenue and financial projections and details of, trade secrets, know-how,strategies,ideas, operations, compliance information, processes, methodologies, and practi`,
        `The Parties have agreed to enter into this Agreement and be bound by the terms and conditions hereinafterset forth governing the disclosure, use and protection of the Confidential Informat`,
        `t, and shall be responsible for the acts and omissions ofits Representatives as if theacts and omissions are those of the receiving Par`,
        `At the disclosing Party’s request made at any time deliver up to or destroy at the receiving Party’s own cost andexpense all documents and any other material in any medium in the possession, custody, or control of thereceiving Party and/or any of itsRepresentatives that bear or incorporate any part of ConfidentialInformation`
      ]}
      // page={2}
      // pageSearch={2}
      specialWordRemoves={[':','.']}
      url={res}

    />
    {/* <PDF /> */}
    </div>
  );
}
