import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Section } from "./sections/sections.component";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private sectionsUrl = 'http://localhost:8080/sections';
  private sectionsReplaceUrl = 'http://localhost:8080/sections/replace';

  constructor(
    private http: HttpClient
  ) { }

  getSections(): Observable<Section[]> {
    console.log('get some sections');
    return this.http.get<Section[]>(this.sectionsUrl);
  }

  writeSection(sections: Section[]): Observable<Section[]> {
    return this.http.post<Section[]>(this.sectionsReplaceUrl, sections);
  }
}
