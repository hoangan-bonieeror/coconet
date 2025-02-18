import { Component, OnInit } from '@angular/core';

export enum Category {

}

export interface Project {
  name: string,
  description: string,
  img_url: string,
  location: string
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projects : Project[] = []
  searchStr : string = ""
  constructor() {}
  ngOnInit(): void {
      this.projects = [
        {
          name: "Project 1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        },
        {
          name: "Project 2",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        },
        {
          name: "Project 3",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        },
        {
          name: "Project 4",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        },
        {
          name: "Project 5",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        },
        {
          name: "Project 6",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        },
        {
          name: "Project 7",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        },
        {
          name: "Project 8",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        },
        {
          name: "Project 9",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
          img_url: 'http://localhost:4200/assets/service/service2.jpg',
          location: "Go Vap District"
        }

      ]
  }

  filterProject() {
    let filterProjectResult : Project[] = []
    let preProcessStr = this.searchStr.trim().toLowerCase()
    this.projects.forEach((pro, index) => {
      let firstCond = pro.name.trim().toLowerCase().includes(preProcessStr)
      let secondCond = pro.location.trim().toLowerCase().includes(preProcessStr)
      let thirdCond = preProcessStr.length == 0
      if(firstCond || secondCond || thirdCond) filterProjectResult.push(pro)
    })
    return filterProjectResult
  }
}
