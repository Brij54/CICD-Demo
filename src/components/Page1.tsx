
        import React, { useState, useEffect } from 'react';
        import "./Page1.css";
        
              import Page1Card1 from "./Page1Card1";
              import usePage1Hook from '../hooks/usePage1Hook';
            
            import Page11Table from '../tables/Page11Table';
            export default function Page1() {
          const {data} = usePage1Hook();

          return (
            <>
            <input className="form-control" placeholder="Placeholder" id="id-1"><input className="form-control" placeholder="Placeholder" id="id-3"><div id="id-5" className="d-flex border border-2 h-50">{data.map((product, index) =&gt; (
              <page1card1 key="{index}" product="{product}">
            ))}</page1card1></div>
            </>
          );
        }