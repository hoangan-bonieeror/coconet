import { Injectable } from '@angular/core';
import * as projectData from '../../config/project.json'
export enum MediaType {
  VIDEO = "video",
  IMAGE = "image"
}

export interface Media {
  type: MediaType,
  title: string,
  url: string
}

export interface Project {
  name: string,
  description: string,
  cover_img: string,
  location: string,
  gallery: ImageInfo[]
}

export enum ImgRatio {
  BLOG_HORIZONTAL = 3/2,
  BLOG_VERTICALL = 2/3,
  SQUARE = 1,

}
export interface ImageInfo {
  img_url: string,
  ratio: number
}


let fake_gallery = [
  {
    img_url: "Baking.jpg",
    ratio: ImgRatio.BLOG_HORIZONTAL
  },
  {
    img_url: "Musing.jpg",
    ratio: ImgRatio.BLOG_HORIZONTAL
  },
  {
    img_url: "TahoePines.jpg",
    ratio: ImgRatio.BLOG_VERTICALL
  },
  {
    img_url: "Baking.jpg",
    ratio: ImgRatio.BLOG_HORIZONTAL
  },
  {
    img_url: "TheSummitEstate.jpg",
    ratio: ImgRatio.BLOG_VERTICALL
  },
  {
    img_url: "Baking.jpg",
    ratio: ImgRatio.BLOG_HORIZONTAL
  },
  {
    img_url: "Musing.jpg",
    ratio: ImgRatio.BLOG_HORIZONTAL
  },
  {
    img_url: "TahoePines.jpg",
    ratio: ImgRatio.BLOG_VERTICALL
  },
  {
    img_url: "Baking.jpg",
    ratio: ImgRatio.BLOG_HORIZONTAL
  },
  {
    img_url: "TheSummitEstate.jpg",
    ratio: ImgRatio.BLOG_VERTICALL
  }
]

@Injectable({
  providedIn: null
})
export class DataService {
  projects : Project[] = [];
  medias: Media[] = [];
  constructor() {
    this.projects = [
      {
        name: "Project 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: fake_gallery
      },
      {
        name: "Project 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: fake_gallery
      },
      {
        name: "Project 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: fake_gallery
      },
      {
        name: "Project 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: fake_gallery
      },
      {
        name: "Project 5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: fake_gallery
      },
      {
        name: "Project 6",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: fake_gallery
      },
      {
        name: "Project 7",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: fake_gallery
      },
      {
        name: "Project 8",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: fake_gallery
      },
      {
        name: "Project 9",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a justo blandit, hendrerit nunc nec, consequat nibh. Duis nec enim sed purus sagittis congue.",
        cover_img: 'service2.jpg',
        location: "Go Vap District",
        gallery: []
      }

    ]
    let testData = projectData.projects as Project[]
    this.projects = [...testData]

    this.medias = [
      // {
      //   title: "Media 1",
      //   type: MediaType.IMAGE,
      //   url: "jason-goodman-bzqU01v-G54-unsplash.jpg"
      // },
      // {
      //   title: "Media 2",
      //   type: MediaType.VIDEO,
      //   url : "6057154_Cctv Monitor Pistol Security_By_Thomas_Gellert_Artlist_HD.mp4"
      // },
      // {
      //   title: "Media 3",
      //   type: MediaType.VIDEO,
      //   url : "6356743_Tv Zombies Movie Apartment_By_Pressmaster_Artlist_HD.mp4"
      // },
      // {
      //   title: "Media 4",
      //   type: MediaType.IMAGE,
      //   url : "pexels-canvastudio-3277808.jpg"
      // },
      // {
      //   title: "Media 5",
      //   type: MediaType.VIDEO,
      //   url : "6064430_Home Styling Interior Decor House Living Room_By_SeventyFour_Artlist_HD.mp4"
      // }
    ]
  }

  getProjectByName(name: string) {
    return this.projects.find(project => project.name == name)
  }

  filterProject(searchStr: string) {
    let filterProjectResult : Project[] = []
    let preProcessStr = searchStr.trim().toLowerCase()
    this.projects.forEach((pro, index) => {
      let firstCond = pro.name.trim().toLowerCase().includes(preProcessStr)
      let secondCond = pro.location.trim().toLowerCase().includes(preProcessStr)
      let thirdCond = preProcessStr.length == 0
      if(firstCond || secondCond || thirdCond) filterProjectResult.push(pro)
    })
    return filterProjectResult
  }
}
