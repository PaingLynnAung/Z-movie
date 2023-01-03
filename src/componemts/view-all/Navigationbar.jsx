
const Navigationbar = (pg,navigation,total_page) => {
  if (total_page<4) {
    if (pg===1) return navigation.splice(0,navigation.length,1);
    if (pg===2) return navigation.splice(0,navigation.length,1,2);
    if (pg===3) return navigation.splice(0,navigation.length,1,2,3);
  }
  else if (total_page>3){
    if (pg===1) return navigation.splice(0,navigation.length,1,2,3,'last');
    else if (pg===2) return navigation.splice(0,navigation.length,1,2,3,4,'last');
    else if (pg===3) return navigation.splice(0,navigation.length,1,2,3,4,5,'last');

    else if (pg===total_page) return navigation.splice(0,navigation.length,'first',total_page-2,total_page-1,total_page);
    else if (pg===total_page-1) return navigation.splice(0,navigation.length,'first',pg-2,pg-1,pg,total_page);
    else if (pg === total_page-2) return navigation.splice(0,navigation.length,'first',pg-2,pg-1,pg,pg+1,total_page);
    else  return navigation.splice(0,navigation.length,'first',pg-2,pg-1,pg,pg+1,pg+2,'last');
  }

  // if (pages !== pg) {
  //   if (pg === 'first') {
  //      navigation.splice(0,navigation.length,1,2,3,'last');
  //   }
  //   else if (navigation.length === 4){
  //     if (indx === 1 && pg === 2){
  //       navigation.splice(3,0,pg+2);
  //     }
  //     else if (indx === 2 && pg === 3){
  //       navigation.splice(3,0,pg+1,pg+2);
  //     }
  //   }


  //   else if (navigation.length === 5){
  //     if (indx === 0 && pg === 1){
  //       navigation.splice(3,1);
  //     }
  //     else if (indx === 2 && pg === 3){
  //       navigation.splice(4,0,pg+2);
  //     }
  //     else if (indx === 3 && pg === 4){
  //       navigation.splice(4,0,pg+1,pg+2);
  //       navigation.splice(0,1,'first');
  //     }
  //   }

  //   else if (navigation.length === 6){
  //     if (indx === 3 && pg === 4) {
  //       navigation.splice(0,1,'first');
  //       navigation.splice(5,0,pg+2);
  //     }
  //     else if (indx === 4 && pg === 5){
  //       navigation.splice(0,2,'first');
  //       navigation.splice(4,0,pg+1,pg+2)
  //     }
  //   }

  //   else if (navigation.length === 7){
  //     if (indx === 4){
  //       navigation.splice(1,1);
  //       navigation.splice(navigation.length-1,0,pg+2)
  //     }
  //     else if (indx === 5){
  //       navigation.splice(1,2);
  //       navigation.splice(navigation.length-1,0,pg+1,pg+2)
  //     }
  //   }
  // }


    // if (pages !== pg) {
    //   if (navigation.length === 4) {
    //       if (indx === 0) {   // reverse navigation condition length 4 
    //         if (pg === 'first') {
    //           navigation.splice(0,4,1,2,3,'last');
    //           return 1;
    //         }
    //       } else if (indx === 1) {
    //         if (pg === total_pages-2) {   // reverse navigation condition length 4 
    //           navigation.splice(1,0,pg-2,pg-1);
    //           return pg;
    //         }else{
    //           navigation.splice(3, 0, pg + 2);
    //           return pg;
    //         }
    //       } else if (indx === 2) {
    //         if (pg === total_pages-1) {   // reverse navigation condition length 4
    //           navigation.splice(1,0,pg-2);
    //           return pg;
    //         }else {
    //           navigation.splice(3, 0, pg + 1, pg + 2);
    //           return pg;
    //         }
    //       }
    //       else if (indx === navigation.length-1) {  // last pages 
    //         navigation.splice(0,4,'first',total_pages-2,total_pages-1,total_pages);
    //         return total_pages;
    //       }
    //     } 
        
    //     // else if (navigation.length === 5) {
    //     //    if (indx === 2){
    //     //      if (pg === total_pages-2){
    //     //        navigation.splice(1,0,pg-2)
    //     //        console.log(navigation)
    //     //      }
    //     //    } 
    //     // }
    //     else if (navigation.length === 5) {
    //       if (indx === 0) {
    //         if (pg === 'first') {    //  reverse navigation condition length 5
    //           navigation.splice(navigation.length-1,1);
    //           navigation.splice(0,4,1,2,3,'last');
    //           return 1;
    //         }else{
    //           navigation.splice(3,1);
    //           return pg;
    //         }
    //       } 
    //       // else if (indx === 3) {
    //       //   navigation.splice(0, 1, "first");
    //       //   navigation.splice(navigation.length - 1, 0, pg + 1, pg + 2);
    //       //   return pg;
    //       // }
    //       else if (indx === 1) {  //  reverse navigation condition length 5
    //         if (pg === total_pages-3) {
    //          navigation.splice(navigation.length-1,1,'last');
    //          navigation.splice(1,0,pg-2,pg-1);
    //          return pg;
    //         }
    //       } 
    //       else if (indx === 2) {
    //        if (pg === total_pages-2) {  //  reverse navigation condition length 5
    //          navigation.splice(1,0,pg-2);
    //          return pg;
    //        }else {
    //          navigation.splice(4, 0, pg + 2);
    //          return pg;
    //        }
    //      }
    //      else if (indx === navigation.length-1) {
    //        if (pg === 'last') {
    //            navigation.splice(navigation.length-1,1);
    //            navigation.splice(0,4,'first',total_pages-2,total_pages-1,total_pages)
    //            return total_pages;
    //        }
    //        else if(pg === total_pages) {  //  reverse navigation condition length 6
    //            navigation.splice(1,1);
    //            return pg;
    //          }
    //      }
         
    //     } 
        
    //     else if (navigation.length === 6) {
    //       if (indx === 4) {
    //         if (pg === total_pages-1) {  //  reverse navigation condition length 6
    //           navigation.splice(1,1);
    //           return pg;
    //         }else {
    //           navigation.splice(0,2,'first')
    //           navigation.splice(navigation.length-1,0,pg+1,pg+2)
    //           return pg;
    //         }
    //       } 
    //       else if (indx === 3) {
    //           navigation.splice(0, 1, "first");
    //           navigation.splice(navigation.length - 1, 0, pg + 2);
    //           return pg;
    //       } 
    //       else if (indx === 1) {
    //         if (pg === total_pages-4) {  //  reverse navigation condition length 6
    //           navigation.splice(4,2,'last');
    //           navigation.splice(1,0,pg-2,pg-1);
    //           return pg;
    //         }else {
    //           navigation.splice(4,1);
    //           return pg;
    //         }
    //       } else if (indx === 0) {
    //         if (pg === 'first') {   //  reverse navigation condition length 6
    //           navigation.splice(navigation.length-2,2);
    //           navigation.splice(0,4,1,2,3,'last');
    //           return 1;
    //         }else{
    //           navigation.splice(3,2);
    //           return pg;
    //         }
    //       } else if (indx === 2) {   //  reverse navigation condition length 6
    //         if (pg === total_pages-3){
    //           navigation.splice(navigation.length-1,1,'last');
    //           navigation.splice(1,0,pg-2);
    //           return pg;
    //         } 
    //       } else if (indx === navigation.length-1) {
    //         if (pg === 'last') {
    //            navigation.splice(navigation.length-2,2);
    //            navigation.splice(0,4,'first',total_pages-2,total_pages-1,total_pages);
    //            return total_pages;
    //         }
    //         else if(pg === total_pages) {  //  reverse navigation condition length 6
    //           navigation.splice(1,2);
    //           return pg;
    //         }
    //     }
    //     }
  
    //     else if (navigation.length === 7) {
    //         if (indx === 0) {
    //            navigation.splice(4);
    //            navigation.splice(0,4,1,2,3,'last');
    //            return 1;
    //         } else if (indx === 1) {
    //         if (pg === 2) {
    //           navigation.splice(4, 2);
    //           navigation.splice(0, 1, 1);
    //           return pg;
    //         } else if (pg === 3) {
    //           navigation.splice(4, 2);
    //           navigation.splice(0, 1, 1, 2);
    //           return pg;
    //         } else {
    //           navigation.splice(4, 2);
    //           navigation.splice(1, 0, pg - 2, pg - 1);
    //           return pg;
    //         }
    //       } else if (indx === 2) {
    //         if (pg === 3) {
    //           console.log('dldl')
    //           navigation.splice(5, 1);
    //           navigation.splice(0, 1, 1);
    //           return pg;
    //         } else {
    //           navigation.splice(5, 1);
    //           navigation.splice(1, 0, pg - 2);
    //           return pg;
    //         }
    //       } 
    //       else if (indx === 4) {
    //         if (pg === total_pages-2) {   //  reverse navigation condition length 7
    //            navigation.splice(1,1);
    //            navigation.splice(navigation.length-1,1,total_pages);
    //            return pg;
    //         }else {
    //           navigation.splice(1, 1);
    //           navigation.splice(navigation.length - 1, 0, pg + 2);
    //           return pg;
    //         }
    //       } 
    //       else if (indx === 5) {
    //         if (pg === total_pages-1) {   //  reverse navigation condition length 7
    //           navigation.splice(1,2);
    //           navigation.splice(navigation.length-1,1,total_pages);
    //           return pg;
    //         } else if (pg === total_pages-2) {   //  reverse navigation condition length 7
    //           navigation.splice(1,1);
    //           navigation.splice(navigation.length-1,0,total_pages-1);
    //           return pg;
    //         }
    //         else {
    //           navigation.splice(1, 2);
    //           navigation.splice(navigation.length - 1, 0, pg + 1, pg + 2);
    //           return pg;
    //         }
    //       }
    //       else if (indx === navigation.length-1) {
    //         navigation.splice(4);
    //         navigation.splice(0,4,'first',total_pages-2,total_pages-1,total_pages);
    //         return total_pages;
    //       }
    //     }
    //   }
}

export default Navigationbar;