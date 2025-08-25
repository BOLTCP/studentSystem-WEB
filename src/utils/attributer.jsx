import React, { useState, useEffect, useRef } from 'react';

export const showAttribution = (attributionComment, attrLink) => {
  const el = document.getElementById("hover-attribution");
  if (el) {
    el.textContent = attributionComment + attrLink;
    el.classList.remove("hidden");
    el.classList.add("visible");
  }
}
export const hideAttribution = () => {
  const el = document.getElementById("hover-attribution");
  if (el) {
    el.classList.remove("visible");
    el.classList.add("hidden");
  }
}
