import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BetonService {

  constructor() {
    console.log(this.DetMod(10))
  }


  Interpolation(x, x0, y0, x1, y1) {
    return y0 + (y1 - y0) * ((x - x0) / (x1 - x0))
  }
  f200(x) {
    return 1.219 - 3.086 * Math.pow(10, -2) * x - 1.136 * Math.pow(10, -2) * Math.pow(x, 2) + 3.160 * Math.pow(10, -3) * Math.pow(x, 3) - 2.932 * Math.pow(10, -4) * Math.pow(x, 4) + 9.320 * Math.pow(10, -6) * Math.pow(x, 5)
  }
  f250(x) {
    return 1.516 - 4.194 * Math.pow(10, -2) * x - 4.926 * Math.pow(10, -3) * Math.pow(x, 2) + 9.645 * Math.pow(10, -4) * Math.pow(x, 3) - 3.441 * Math.pow(10, -5) * Math.pow(x, 4) - 5.056 * Math.pow(10, -7) * Math.pow(x, 5)
  }
  f300(x) {
    return 1.865 - 8.666 * Math.pow(10, -2) * x - 6.769 * Math.pow(10, -4) * Math.pow(x, 2) + 1.691 * Math.pow(10, -3) * Math.pow(x, 3) - 1.802 * Math.pow(10, -4) * Math.pow(x, 4) + 5.891 * Math.pow(10, -6) * Math.pow(x, 5)
  }
  f350(x) {
    return 2.196 - 1.530 * Math.pow(10, -1) * x + 3.029 * Math.pow(10, -2) * Math.pow(x, 2) - 4.257 * Math.pow(10, -3) * Math.pow(x, 3) + 3.037 * Math.pow(10, -4) * Math.pow(x, 4) - 8.278 * Math.pow(10, -6) * Math.pow(x, 5)
  }
  f400(x) {
    return 2.542 - 2.090 * Math.pow(10, -1) * x + 4.163 * Math.pow(10, -2) * Math.pow(x, 2) - 5.753 * Math.pow(10, -3) * Math.pow(x, 3) + 4.232 * Math.pow(10, -4) * Math.pow(x, 4) - 1.236 * Math.pow(10, -5) * Math.pow(x, 5)
  }
  f400plus(x) {
    return 2.716 - 9.467 * Math.pow(10, -2) * x - 1.715 * Math.pow(10, -2) * Math.pow(x, 2) + 6.228 * Math.pow(10, -3) * Math.pow(x, 3) - 6.230 * Math.pow(10, -4) * Math.pow(x, 4) + 2.057 * Math.pow(10, -5) * Math.pow(x, 5)
  }

  // CalculC(A,G,σ28,fc28,) {
  //   return new Promise((resolve,reject)=>{
  //     let B=this.CparE(fc28,G,σ28);
  //     console.log(B)
  //     if (this.f400plus(A) < B) resolve(0);
  //     else if (this.f200(A) > B) resolve(0);
  //     else if (this.f200(A)<=B&&B<this.f250(A)) resolve(250);
  //     else if (this.f250(A)<=B&&B<this.f300(A)) resolve(300);
  //     else if (this.f300(A)<=B&&B<this.f350(A)) resolve(350);
  //     else if (this.f350(A)<=B&&B<=this.f400(A)) resolve(400);
  //     else if (this.f400(A)<B&&B<=this.f400plus(A)) resolve ("400+fluidifiant");
  //   })

  // }

  CalculC(A, G, σ28, fc28, ) {
    return new Promise((resolve, reject) => {
      let B = this.CparE(fc28, G, σ28);
      console.log(B)
      if (this.f400plus(A) < B) resolve(0);
      else if (this.f200(A) > B) resolve(0);
      else if (this.f200(A) <= B && B < this.f250(A)) resolve(this.roundC(this.Interpolation(B, this.f200(A), 200, this.f250(A), 250)));
      else if (this.f250(A) <= B && B < this.f300(A)) resolve(this.roundC(this.Interpolation(B, this.f250(A), 250, this.f300(A), 300)));
      else if (this.f300(A) <= B && B < this.f350(A)) resolve(this.roundC(this.Interpolation(B, this.f300(A), 300, this.f350(A), 350)));
      else if (this.f350(A) <= B && B <= this.f400(A)) resolve(this.roundC(this.Interpolation(B, this.f350(A), 350, this.f400(A), 400)));
      else if (this.f400(A) < B && B <= this.f400plus(A)) resolve("400+fluidifiant");
    })

  }

  roundC(c) {
    console.log('c:', c);
    if (199 <= c && c < 225) return 200;
    else if (225 <= c && c < 275) return 250;
    else if (275 <= c && c < 325) return 300;
    else if (325 <= c && c < 375) return 350;
    else if (375 <= c && c < 425) return 400;
    else if (c > 425) return c;



  }

  fcm(fc28: number) {
    return fc28 * 1.15;
  }

  CparE(fc28, G, σ28) {
    return this.fcm((fc28) / (G * σ28)) + 0.5
  }

  calculE(c, B, Dmax) {
    return (Number((c / B).toFixed(1)) + this.ajusteE(Dmax));
  }
  ajusteE(Dmax) {
    if (Dmax == 4) return 15;
    else if (Dmax == 8) return 9;
    else if (Dmax == 12.5) return 4;
    else if (Dmax == 20) return 0;
    else if (Dmax == 31.5) return -4;
    else if (Dmax == 50) return -8;
    else if (Dmax == 80) return -12;
    else return 0;
  }

  DetMod(Dmax) {
    let module = [20, 21, 22,23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    let diametre = [0.08, 0.1, 0.125,0.16, 0.2, 0.25, 0.315, 0.5, 0.63, 0.8, 1, 1.25, 1.60, 2, 2.5, 3.15, 4, 5, 6.30, 8, 10, 12.5, 16, 20, 25, 31.5, 40, 50, 63.5, 80];
    let i = diametre.findIndex((item) => item === Dmax);
    return module[i];
}
 

  abscisseA(Dmax) {
    if (Dmax <= 20) return this.DetMod(Dmax / 2);
    else if (Dmax > 20) return (38 + this.DetMod(Dmax)) / 2;
  }

  ordonnéeA(Dmax) {
    return Number((50 - Math.sqrt(Dmax)).toFixed(2));
  }

  EquationOA(Dmax, x) {
    let YA = this.ordonnéeA(Dmax);
    let XA = this.abscisseA(Dmax);
    let a = YA / (XA - 20);
    console.log('a:', a);
    let b = (-20 * YA) / (XA - 20);
    console.log('b:', b);
    return a * x + b;


  }
  EquationAB(Dmax, x) {
    
    let YA = this.ordonnéeA(Dmax);
    let XA = this.abscisseA(Dmax);
    let a = (100 - YA) / (this.DetMod(Dmax) - XA);
    let b = 100 - a * this.DetMod(Dmax);
    return a * x + b;
  }

  refus (passant) {
    return 100- passant;
  }
 
  detx95(gr:any[]) {
      for (let i = 0; i < gr.length; i++) {
        let sable = gr[i];
        let sable1= gr[i+1]
        if (this.refus(sable.passant)<=95) return this.Interpolation(95, this.refus(sable.passant), this.DetMod(+sable.module),  this.refus(sable1.passant), this.DetMod(+sable1.module));
      }
  }

  detx5(gr:any[]) {
      for (let i = gr.length-1; i > 0; i--) {
        let gravier = gr[i];
        let gravier1= gr[i-1]
        if (this.refus(gravier.passant)>=5) return this.Interpolation(5, this.refus(gravier.passant), this.DetMod(+gravier.module),  this.refus(gravier1.passant), this.DetMod(+gravier1.module));
      }
  }

  EquationCD(granulometrie: [], x) {
    let dext95 = this.detx95(granulometrie);
    let a = 90 / (dext95 - this.detx5(granulometrie));
    let b = 95 - dext95 * a;
    return a * x + b;
  }

  // AbscSable(Dmax, granulometrie) {
  //   for (let x1 = 20; x1 <= this.abscisseA(Dmax); x1 + 0.05) {
  //     if (Math.abs(this.EquationOA(Dmax, x1) - this.EquationCD(granulometrie, x1)) < Number.EPSILON) return x1
  //   }
  // }

  // AbscGravier(Dmax, granulometrie) {
  //   for (let x1 = this.abscisseA(Dmax); x1 <= Dmax; x1 + 0.05) {
  //     if (Math.abs(this.EquationAB(Dmax, x1) - this.EquationCD(granulometrie, x1)) < Number.EPSILON) return x1
  //   }
  // }

  // Ord(Dmax, Absc) {
  //   return this.EquationOA(Dmax, Absc)
  // }
}
