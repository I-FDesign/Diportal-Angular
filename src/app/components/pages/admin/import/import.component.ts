import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

  public xmlItems: any;

  link: string;

  constructor(private http: HttpClient) {
  }

  formSubmit() {
    if (!this.link) {
      return;
    }

    this.loadXML();

  }

  loadXML() {
    this.http.get(this.link,
      {
        headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
            console.log(this.xmlItems);
          });
      });
  }
  parseXML(data) {
    return new Promise(resolve => {
      let k: string | number;
      const arr = [];
      const parser = new xml2js.Parser();
      parser.parseString(data, (err, result) => {
        const obj = result.Employee;
        // tslint:disable-next-line: forin
        for (k in obj.emp) {
          const item = obj.emp[k];
          arr.push({
            id: item.id[0],
            name: item.name[0],
            gender: item.gender[0],
            mobile: item.mobile[0]
          });
        }
        resolve(arr);
      });
    });
  }

}
