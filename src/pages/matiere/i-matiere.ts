import { IVolumeHoraire } from "../volume-horaire/i-volume-horaire";
import { IProfesseur } from "../professeur/i-professeur";

export interface IMatiere {
    numat:number,
    designation:string,
    nbheur:number,
    titulaire:IProfesseur,
    volumeh:IVolumeHoraire
}