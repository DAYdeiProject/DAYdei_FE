import { React, useRef } from "react";
// import CalendarPostModal from "../calendar/CalendarPostModal";
import ModalWrapper from "../../../elements/Modalwrapper";
import Modalbox from "../../../elements/Modalbox";

function CategoryModal({ CategoryModalRef }) {
  return (
    <ModalWrapper>
      <Modalbox>
        <div ref={CategoryModalRef}>
          <div>모달입니다</div>
        </div>
      </Modalbox>
    </ModalWrapper>
  );
}

export default CategoryModal;
