import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import { environment } from '../../environments/environment';

@Injectable()
export class OpentokService {

  session: OT.Session;
  token: string;

  constructor() { }

  getOT() {
    return OT;
  }

  initSession(API_KEY= '46800404',session,token) {
      debugger
    // if (environment.API_KEY && environment.TOKEN && environment.SESSION_ID) {
      this.session = this.getOT().initSession(API_KEY,session);
      this.token =token;// environment.TOKEN;
      return Promise.resolve(this.session);
    // } else {
    //   return fetch(environment.SAMPLE_SERVER_BASE_URL + '/session')
    //     .then((data) => data.json())
    //     .then((json) => {
    //       this.session = this.getOT().initSession(json.apiKey, json.sessionId);
    //       this.token = json.token;
    //       return this.session;
    //     });
    // }
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
  disconnect() {
    return new Promise((resolve, reject) => {
      this.session.disconnect();
    });
  }
  positionElement(elem, x, y, width, height, animate) {
    var targetPosition = {
        left: x + 'px',
        top: y + 'px',
        width: width + 'px',
        height: height + 'px'
    };

    var fixAspectRatio = function () {
        var sub = elem.querySelector('.OT_root');
        if (sub) {
            // If this is the parent of a subscriber or publisher then we need
            // to force the mutation observer on the publisher or subscriber to
            // trigger to get it to fix it's layout
            var oldWidth = sub.style.width;
            sub.style.width = width + 'px';
            // sub.style.height = height + 'px';
            sub.style.width = oldWidth || '';
        }
    };

    // if (animate && $) {
    //     $(elem).stop();
    //     $(elem).animate(targetPosition, animate.duration || 200, animate.easing || 'swing',
    //     function () {
    //         fixAspectRatio();
    //         if (animate.complete) animate.complete.call(this);
    //     });
    // } else {
    //     console.log(targetPosition);
    //     // NOTE: internal OT.$ API
    //     elem.style.marginLeft = targetPosition.left;
    //     elem.style.marginTop = targetPosition.top;
    //     elem.style.width = targetPosition.width;
    //     elem.style.height = targetPosition.height;
    //     elem.style.zIndex = '-1';
    //     //OT.$.css(elem, targetPosition);
    // }
    fixAspectRatio();
};

  getVideoRatio (elem) {
    if (!elem) {
        return 3 / 4;
    }
    var video = elem.querySelector('video');
    if (video && video.videoHeight && video.videoWidth) {
        return video.videoHeight / video.videoWidth;
    } else if (elem.videoHeight && elem.videoWidth) {
        return elem.videoHeight / elem.videoWidth;
    }
    return 3 / 4;
}
  arrange(children, Width, Height, offsetLeft, offsetTop, fixedRatio,minRatio, maxRatio, animate) {
    var count = children.length,
        dimensions;
    var getBestDimensions = function getBestDimensions(minRatio, maxRatio) {
        var maxArea,
            targetCols,
            targetRows,
            targetHeight,
            targetWidth,
            tWidth,
            tHeight,
            tRatio;
        // Iterate through every possible combination of rows and columns
        // and see which one has the least amount of whitespace
        for (var i=1; i <= count; i++) {
            var cols = i;
            var rows = Math.ceil(count / cols);  // (.97)=> 1

            // Try taking up the whole height and width
            tHeight = Math.floor( Height/rows ); // (10.96)=>10
            tWidth = Math.floor(Width/cols);

            tRatio = tHeight/tWidth;
            if (tRatio > maxRatio) {
                // We went over decrease the height
                tRatio = maxRatio;
                tHeight = tWidth * tRatio;
            } else if (tRatio < minRatio) {
                // We went under decrease the width
                tRatio = minRatio;
                tWidth = tHeight / tRatio;
            }

            var area = (tWidth*tHeight) * count;

            // If this width and height takes up the most space then we're going with that
            if (maxArea === undefined || (area > maxArea)) {
                maxArea = area;
                targetHeight = tHeight;
                targetWidth = tWidth;
                targetCols = cols;
                targetRows = rows;
            }
        }
        return {
            maxArea: maxArea,
            targetCols: targetCols,
            targetRows: targetRows,
            targetHeight: targetHeight,
            targetWidth: targetWidth,
            ratio: targetHeight / targetWidth
        };
    };

    if (!fixedRatio) {
        dimensions = getBestDimensions(minRatio, maxRatio);
        //console.log(dimensions);

    } else {
        // Use the ratio of the first video element we find to approximate
        var ratio = this.getVideoRatio(children.length > 0 ? children[0] : null);
        dimensions = getBestDimensions(ratio, ratio);
    }
    // Loop through each stream in the container and place it inside
    var x = 0,
    y = 0,
    rows = [],
    row;
    // Iterate through the children and create an array with a new item for each row
    // and calculate the width of each row so that we know if we go over the size and need
    // to adjust
    for (var i=0; i < children.length; i++) {
        if (i % dimensions.targetCols === 0) {
        // This is a new row
            row = {
                children: [],
                width: 0,
                height: 0
            };
            rows.push(row);
        }
        var elem = children[i];
        row.children.push(elem);
        var targetWidth = dimensions.targetWidth;
        var targetHeight = dimensions.targetHeight;
        // If we're using a fixedRatio then we need to set the correct ratio for this element
        if (fixedRatio) {
            targetWidth = targetHeight / this.getVideoRatio(elem);
        }
        row.width += targetWidth;
        row.height = targetHeight;
    }
    // Calculate total row height adjusting if we go too wide
    var totalRowHeight = 0;
    var remainingShortRows = 0;
    for (i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row.width > Width) {
            // Went over on the width, need to adjust the height proportionally
            row.height = Math.floor(row.height * (Width / row.width));
            row.width = Width;
        } else if (row.width < Width) {
            remainingShortRows += 1;
        }
        totalRowHeight += row.height;
    }
    if (totalRowHeight < Height && remainingShortRows > 0) {
        // We can grow some of the rows, we're not taking up the whole height
        var remainingHeightDiff = Height - totalRowHeight;
        totalRowHeight = 0;
        for (i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.width < Width) {
                // Evenly distribute the extra height between the short rows
                var extraHeight = remainingHeightDiff / remainingShortRows;
                if ((extraHeight / row.height) > ((Width - row.width) / row.width)) {
                    // We can't go that big or we'll go too wide
                    extraHeight = Math.floor(((Width - row.width) / row.width) * row.height);
                }
                row.width += Math.floor((extraHeight / row.height) * row.width);
                row.height += extraHeight;
                remainingHeightDiff -= extraHeight;
                remainingShortRows -= 1;
            }
            totalRowHeight += row.height;
        }
    }
    // vertical centering
    y = ((Height - (totalRowHeight)) / 2);
    // Iterate through each row and place each child
    for (i = 0; i < rows.length; i++) {
        var row = rows[i];
        // center the row
        var rowMarginLeft = ((Width - row.width) / 2);
        x = rowMarginLeft;
        for (var j = 0; j < row.children.length; j++) {
            var elem = row.children[j];
            var targetWidth = dimensions.targetWidth;
            var targetHeight = row.height;
            // If we're using a fixedRatio then we need to set the correct ratio for this element
            if (fixedRatio) {
              targetWidth = Math.floor(targetHeight / this.getVideoRatio(elem));
            }
            // NOTE: internal OT.$ API
            elem.style.position = 'absolute';
            //OT.$.css(elem, 'position', 'absolute');
            var actualWidth = targetWidth - this.getCSSNumber(elem, 'paddingLeft') - this.getCSSNumber(elem, 'paddingRight') - this.getCSSNumber(elem, 'marginLeft') - this.getCSSNumber(elem, 'marginRight') - this.getCSSNumber(elem, 'borderLeft') - this.getCSSNumber(elem, 'borderRight');
            var actualHeight = targetHeight - this.getCSSNumber(elem, 'paddingTop') - this.getCSSNumber(elem, 'paddingBottom') - this.getCSSNumber(elem, 'marginTop') - this.getCSSNumber(elem, 'marginBottom') - this.getCSSNumber(elem, 'borderTop') - this.getCSSNumber(elem, 'borderBottom');
            this.positionElement(elem, x+offsetLeft, y+offsetTop, actualWidth, actualHeight, animate);
            x += targetWidth;
        }
        y += targetHeight;
    }
};


  getHeight (elem) {
    // NOTE: internal OT.$ API
    var heightStr =  elem.style.height; //OT.$.height(elem);
    return heightStr ? parseInt(heightStr, 10) : 0;
};        
 getWidth (elem) {
    // NOTE: internal OT.$ API
    var widthStr = elem.style.width; // OT.$.width(elem);
    return widthStr ? parseInt(widthStr, 10) : 0;
};
getCSSNumber (elem, prop) {
    // NOTE: internal OT.$ API
    var cssStr = elem.style.prop;  // OT.$.css(elem, prop);
    return cssStr ? parseInt(cssStr, 10) : 0;
};
createLayout(container, opts,optional){
    var id = container.getAttribute('id');
    
    var strPattern = window.location.href;
    var pattPattern = new RegExp("room");
    if(pattPattern.test(strPattern)){
        container.style.width = window.innerWidth+'px';    
        container.style.height =   ((window.innerHeight/100)*75)+'px';
        
    }else{
          if(optional){
        container.style.width = window.innerWidth+'px';   
        container.style.height =   (window.innerHeight)+'px'; 
        }else{
            container.style.width = (window.innerWidth/2)+'px'; 
            container.style.height =   ((window.innerHeight/100)*75)+'px';
        }  
    }
    
    var filterDisplayNone = function (element) {
        return element.style.display !== 'none';
    };



    var getVideoRatio = function(elem) {
        if (!elem) {
            return 3 / 4;
        }
        var video = elem.querySelector('video');
        if (video && video.videoHeight && video.videoWidth) {
            return video.videoHeight / video.videoWidth;
        } else if (elem.videoHeight && elem.videoWidth) {
            return elem.videoHeight / elem.videoWidth;
        }
        return 3 / 4;
    }

    var getCSSNumber = function (elem, prop) {
        // NOTE: internal OT.$ API
        // var cssStr = OT.$.css(elem, prop);
        // return cssStr ? parseInt(cssStr, 10) : 0;
        return 0;
    };
    var Height = this.getHeight(container) - getCSSNumber(container, 'borderTop') - getCSSNumber(container, 'borderBottom'),
    Width = this.getWidth(container) - getCSSNumber(container, 'borderLeft') - getCSSNumber(container, 'borderRight'),
    availableRatio = Height/Width,
    offsetLeft = 0,
    offsetTop = 0,
    bigOffsetTop = 0,
    bigOffsetLeft = 0,
    bigOnes = Array.prototype.filter.call(container.querySelectorAll('#' + id + '>.' + opts.bigClass),filterDisplayNone),
    smallOnes = Array.prototype.filter.call(container.querySelectorAll('#' + id + '>*:not(.' + opts.bigClass + ')'),filterDisplayNone);

    if (bigOnes.length > 0 && smallOnes.length > 0) {
        var bigWidth, bigHeight;
        if (availableRatio > this.getVideoRatio(bigOnes[0])) {
            // We are tall, going to take up the whole width and arrange small
            // guys at the bottom
            bigWidth = Width;
            bigHeight = Math.floor(Height * opts.bigPercentage);
            offsetTop = bigHeight;
            bigOffsetTop = Height - offsetTop;
        } else {
            // We are wide, going to take up the whole height and arrange the small
            // guys on the right
            bigHeight = Height;
            bigWidth = Math.floor(Width * opts.bigPercentage);
            offsetLeft = bigWidth;
            bigOffsetLeft = Width - offsetLeft;
        }
        if (opts.bigFirst) {
          this.arrange(bigOnes, bigWidth, bigHeight, 0, 0, opts.bigFixedRatio, opts.bigMinRatio,opts.bigMaxRatio, opts.animate);
          this.arrange(smallOnes, Width - offsetLeft, Height - offsetTop, offsetLeft, offsetTop,opts.fixedRatio, opts.minRatio, opts.maxRatio, opts.animate);
        } else {
          this.arrange(smallOnes, Width - offsetLeft, Height - offsetTop, 0, 0, opts.fixedRatio,opts.minRatio, opts.maxRatio, opts.animate);
          this.arrange(bigOnes, bigWidth, bigHeight, bigOffsetLeft, bigOffsetTop,
            opts.bigFixedRatio, opts.bigMinRatio, opts.bigMaxRatio, opts.animate);
        }
    } else if (bigOnes.length > 0 && smallOnes.length === 0) {
        // We only have one bigOne just center it
        this.arrange(bigOnes, Width, Height, 0, 0, opts.bigFixedRatio, opts.bigMinRatio,opts.bigMaxRatio, opts.animate);
    } else {
        this.arrange(smallOnes, Width - offsetLeft, Height - offsetTop, offsetLeft, offsetTop,opts.fixedRatio, opts.minRatio, opts.maxRatio, opts.animate);
    }
}
}
