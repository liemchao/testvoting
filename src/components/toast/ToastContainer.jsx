import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainerConfig() {
  const StyledContainer = styled(ToastContainer).attrs({
    // custom props
  })`
    .Toastify__toast-container {
    }
    .Toastify__toast {
    }
    .Toastify__toast--error {
    }
    .Toastify__toast--warning {
    }
    .Toastify__toast--success {
    }
    .Toastify__toast-body {
    }
    .Toastify__progress-bar {
    }
  `;

  return (
    <StyledContainer
      position="bottom-center"
      autoClose={4000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
      className="my-toast-container"
      // style={{ whiteSpace: "nowrap" }}
    />
  );
}
