import { TeamCriteria } from "@/types";

export const teamEvaluation = (K1:any, K2a:any, K2b:any, K3:any, A:any, B:any) =>{
    let O1,O2a,O2b,O3;

    O1 = K1.map((item:TeamCriteria)=>{
        let O;

        if(item.lingusticValue === "B") O = 10*item.credibility;
        else if(item.lingusticValue === "C") O=8*item.credibility;
        else if(item.lingusticValue === "HC") O=5*item.credibility;
        else  O=2*item.credibility;
        
        if(O<=0) return 0;
        else if(O<=5) return 0.02*O*O;
        else if(O<=10) return 1 - 0.02 * (10-O)*(10-O);
        else return 1;
    })

    
    O2a = K2a.map((item:TeamCriteria)=>{
        let O;

        if(item.lingusticValue === "B") O = 10*item.credibility;
        else if(item.lingusticValue === "C") O=8*item.credibility;
        else if(item.lingusticValue === "HC") O=5*item.credibility;
        else  O=2*item.credibility;
        
        if(O<=0) return 0;
        else if(O<=5) return 0.02*O*O;
        else if(O<=10) return 1 - 0.02 * (10-O)*(10-O);
        else return 1;
    })

    
    O2b = K2b.map((item:TeamCriteria)=>{
        let O;

        if(item.lingusticValue === "B") O = 10*item.credibility;
        else if(item.lingusticValue === "C") O=8*item.credibility;
        else if(item.lingusticValue === "HC") O=5*item.credibility;
        else  O=2*item.credibility;
        
        if(O<=0) return 0;
        else if(O<=5) return 0.02*O*O;
        else if(O<=10) return 1 - 0.02 * (10-O)*(10-O);
        else return 1;
    })

    
    O3 = K3.map((item:TeamCriteria)=>{
        let O;

        if(item.lingusticValue === "B") O = 10*item.credibility;
        else if(item.lingusticValue === "C") O=8*item.credibility;
        else if(item.lingusticValue === "HC") O=5*item.credibility;
        else  O=2*item.credibility;
        
        if(O<=0) return 0;
        else if(O<=5) return 0.02*O*O;
        else if(O<=10) return 1 - 0.02 * (10-O)*(10-O);
        else return 1;
    })

    
    const Z1 = (1/(K1[0].expected+K1[1].expected))*(O1[0]*K1[0].expected + O1[1]*K1[1].expected)
    
    const Z2a = 1/(K2a[0].expected+K2a[1].expected)*(O2a[0]*K2a[0].expected + O2a[1]*K2a[1].expected)
    const Z2b = 1/(K2b[0].expected+K2b[1].expected+K2b[2].expected)*(O2b[0]*K2b[0].expected + O2b[1]*K2b[1].expected + O2b[2]*K2b[2].expected)
    
    const Z2 = 1/(B[0]+B[1])*(Z2a*B[0] + Z2b*B[1])
    const Z3 = 1/(K3[0].expected+K3[1].expected+ K3[2].expected+K3[3].expected)*(O3[0]*K3[0].expected + O3[1]*K3[1].expected + O3[2]*K3[2].expected + O3[3]*K3[3].expected)

    const W1 = A[0]/(A[0]+A[1]+A[2])*Z1;
    const W2 = A[1]/(A[0]+A[1]+A[2])*Z2;
    const W3 = A[2]/(A[0]+A[1]+A[2])*Z3;

    const Z = W1+W2+W3
    return {

        O1:O1,
        O2a:O2a,
        O2b:O2b,
        O3:O3,

        Z:Z
    }
}