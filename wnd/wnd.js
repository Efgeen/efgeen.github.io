const wnd = (function() {
    return Object.freeze({
        minimize: function(element, callback) {
            let parent = element;
            while(parent && !parent.classList.contains("wnd2")) {
                parent = parent.parentElement;
            }
            if (parent) {
                let style = window.getComputedStyle(parent);
                let minimized;
                if (style.getPropertyValue("--display"))  {
                    parent.style.display = style.getPropertyValue("--display");
                    parent.style.setProperty("--display", null);
                    minimized = false;
                }
                else {
                    parent.style.setProperty("--display", style.display);
                    parent.style.display = "none";
                    minimized = true;
                }
                callback?.(minimized);
            }
        },
        maximize: function(element, callback) {
            let parent = element;
            while(parent && !parent.classList.contains("wnd2")) {
                parent = parent.parentElement;
            }
            if (parent) {
                let style = window.getComputedStyle(parent);
                let maximized;
                if (style.getPropertyValue("--width")) {
                    parent.style.width = style.getPropertyValue("--width");
                    parent.style.height = style.getPropertyValue("--height");
                    parent.style.setProperty("--width", null);
                    parent.style.setProperty("--height", null);
                    element.innerHTML = "&#x1F5D6;";
                    maximized = false;
                }
                else {
                    parent.style.setProperty("--width", style.width);
                    parent.style.setProperty("--height", style.height);
                    parent.style.width = "100%";
                    parent.style.height = "100%";
                    element.innerHTML = "&#x1F5D7;";
                    maximized = true;
                }
                callback?.(maximized);
            }
        },
        close: function(element, callback) {
            let parent = element;
            while(parent && !parent.classList.contains("wnd2")) {
                parent = parent.parentElement;
            }
            if (parent) {
                parent.style.display = "none";
                callback?.();
            }
        }
    });
})();

window.addEventListener("load", () => {
    let elements = document.querySelectorAll(".wnd2 > div:first-of-type");
    Array.from(elements).forEach(element => {
        let x0 = 0;
        let y0 = 0;
        let onmouseup = null;
        let onmousemove = null;
        let x1 = 0;
        let y1 = 0;

        function endDrag(e) {
            document.onmouseup = onmouseup;
            onmouseup = null;
            document.onmousemove = onmousemove;
            onmousemove = null;
        };

        function drag(e) {
            e = e || window.event;
            e.preventDefault();

            x1 = x0 - e.clientX;
            y1 = y0 - e.clientY;
            x0 = e.clientX;
            y0 = e.clientY;

            // element.parentNode.style.left = element.parentNode.offsetLeft - x1 + "px";
            // element.parentNode.style.top = element.parentNode.offsetTop - y1 + "px";

            const parentContainer = element.parentNode.parentNode;
            const newPositionLeft = element.parentNode.offsetLeft - x1;
            const newPositionTop = element.parentNode.offsetTop - y1;
      
            const containerWidth = parentContainer.clientWidth;
            const containerHeight = parentContainer.clientHeight;
            const elementWidth = element.parentNode.offsetWidth;
            const elementHeight = element.parentNode.offsetHeight;
      
            const pivotOffsetX = elementWidth / 2;
            const pivotOffsetY = elementHeight / 2;

            // Calculate the limits
            const minLeft = pivotOffsetX;
            const minTop = pivotOffsetY;
            const maxLeft = containerWidth - elementWidth + pivotOffsetX;
            const maxTop = containerHeight - elementHeight + pivotOffsetY;
      
            // Restrict the position within the container bounds
            const newLeft = Math.max(minLeft, Math.min(newPositionLeft, maxLeft));
            const newTop = Math.max(minTop, Math.min(newPositionTop, maxTop));
      
            // Update the position
            element.parentNode.style.left = newLeft + "px";
            element.parentNode.style.top = newTop + "px";
        };

        function beginDrag(e) {
            e = e || window.event;
            e.preventDefault();

            x0 = e.clientX;
            y0 = e.clientY;

            onmouseup = document.onmouseup;
            document.onmouseup = endDrag;

            onmousemove = document.onmousemove;
            document.onmousemove = drag;
        };

        element.addEventListener("mousedown", function(e) {
            if (e.target === element) {
                beginDrag(e);
            }
        });
    });
});
