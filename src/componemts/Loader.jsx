import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    let loaderVariants = {
        visible: {
          x : [-15,15],
          y : [0,-30],
          transition: {
            x: {
              yoyo: Infinity,
              duration: 0.5
            },
            y: {
              yoyo: Infinity,
              duration: 0.25
            }
          }
        }
      }
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1em',height:'6em'}}>
            <span style={{letterSpacing:'3px'}}>Loading...</span>
            <motion.div variants={loaderVariants} animate='visible' style={{width:'10px',height:'10px',borderRadius:'50%',background:'purple'}}>
            </motion.div>
        </div>
    )
}

export default Loader;