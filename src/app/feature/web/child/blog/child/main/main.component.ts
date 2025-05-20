import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../../interface/category';
import { ApiService } from '../../../../../../core/service/api.service';
import { JoinPost, Post } from '../../../../../../interface/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  categories: Category[] = [];
  topBlogs : Post[] = [
    {
      id: 1,
      title: "Embracing Minimalism: A Guide to a Clutter-Free Home",
      content: "Discover the beauty of less!  This post explores the principles of minimalism in interior design, offering practical tips for decluttering, choosing essential pieces, and creating a serene and calming living space.  We'll cover color palettes, storage solutions, and the importance of negative space.",
      categoryId: 1, // Assuming 1 is "Minimalist Design"
      authorId: "user123", // Assuming "user123" is a valid user ID
      createdAt: new Date("2023-10-26T10:00:00Z"),
      updatedAt: new Date("2023-10-26T10:00:00Z"),
      img_overview: ""
    },
    {
      id: 2,
      title: "Biophilic Design: Bringing the Outdoors In",
      content: "Learn how to connect with nature inside your home!  We explore the principles of biophilic design, including incorporating natural light, plants, natural materials (wood, stone, bamboo), and nature-inspired textures to improve well-being and create a more harmonious living environment.",
      categoryId: 2, // Assuming 2 is "Biophilic Design"
      authorId: "user456",
      createdAt: new Date("2023-10-25T14:30:00Z"),
      updatedAt: new Date("2023-10-25T14:30:00Z"),
      img_overview: ""
    },
    {
      id: 3,
      title: "The Resurgence of Art Deco: Glamour and Geometric Patterns",
      content: "Step back in time with the elegance of Art Deco!  This post examines the key elements of Art Deco design, including bold geometric patterns, luxurious materials (velvet, gold, lacquer), and statement lighting.  We'll show you how to incorporate Art Deco influences into a modern setting without feeling like you're living in a museum.",
      categoryId: 3, // Assuming 3 is "Art Deco"
      authorId: "user789",
      createdAt: new Date("2023-10-24T08:00:00Z"),
      updatedAt: new Date("2023-10-24T08:00:00Z"),
      img_overview: ""
    },
    {
      id: 4,
      title: "Small Space Solutions: Maximizing Style and Functionality",
      content: "Living in a small apartment doesn't mean sacrificing style.  This guide offers clever space-saving solutions, multi-functional furniture ideas, and tips for creating an illusion of spaciousness with mirrors, lighting, and strategic color choices.",
      categoryId: 4, // Assuming 4 is "Small Space Design"
      authorId: "user123",
      createdAt: new Date("2023-10-23T16:00:00Z"),
      updatedAt: new Date("2023-10-23T16:00:00Z"),
      img_overview: ""
    },
    {
      id: 5,
      title: "Color Psychology: Choosing the Right Hues for Your Home",
      content: "Color can dramatically impact your mood and energy levels.  This post delves into the psychology of color, explaining how different hues can affect your emotions and offering guidance on selecting the perfect color palette for each room in your home. We'll also explore current color trends and how to incorporate them effectively.",
      categoryId: 5, // Assuming 5 is "Color Trends"
      authorId: "user456",
      createdAt: new Date("2023-10-22T11:30:00Z"),
      updatedAt: new Date("2023-10-22T11:30:00Z"),
      img_overview: ""
    },
    {
      id: 6,
      title: "Sustainable Design: Eco-Friendly Choices for a Greener Home",
      content: "Create a beautiful and environmentally conscious home!  We explore sustainable design principles, covering eco-friendly materials, energy-efficient appliances, water conservation techniques, and tips for reducing your carbon footprint through mindful design choices.",
      categoryId: 6, // Assuming 6 is "Sustainable Design"
      authorId: "user789",
      createdAt: new Date("2023-10-21T09:00:00Z"),
      updatedAt: new Date("2023-10-21T09:00:00Z"),
      img_overview: ""
    },
      {
      id: 7,
      title: "Mid-Century Modern Magic: Timeless Elegance for Today's Homes",
      content: "Discover the enduring appeal of Mid-Century Modern design. This post explores the key characteristics, iconic furniture pieces, and how to incorporate this style into a contemporary living space.  We'll focus on clean lines, organic shapes, and the use of natural materials.",
      categoryId: 7, // Assuming 7 is "Mid-Century Modern"
      authorId: "user123",
      createdAt: new Date("2023-10-20T13:00:00Z"),
      updatedAt: new Date("2023-10-20T13:00:00Z"),
      img_overview: ""
    },
    {
      id: 8,
      title: "Lighting Secrets: Illuminating Your Space for Ambiance and Function",
      content: "Master the art of lighting! This guide covers different types of lighting (ambient, task, accent), how to layer lighting effectively, and choosing the right fixtures to create the perfect mood and functionality in each room.  We'll also discuss smart lighting options and energy-saving bulbs.",
      categoryId: 8, // Assuming 8 is "Lighting Design"
      authorId: "user456",
      createdAt: new Date("2023-10-19T17:00:00Z"),
      updatedAt: new Date("2023-10-19T17:00:00Z"),
      img_overview: ""
    },
    {
      id: 9,
      title: "Textile Trends: Adding Texture and Personality to Your Interiors",
      content: "Explore the world of fabrics and textures! This post highlights the latest textile trends, including boucle, velvet, linen, and natural fibers.  Learn how to incorporate these textures into your home through upholstery, curtains, rugs, and decorative pillows to add depth and visual interest.",
      categoryId: 9, // Assuming 9 is "Textiles & Fabrics"
      authorId: "user789",
      createdAt: new Date("2023-10-18T10:30:00Z"),
      updatedAt: new Date("2023-10-18T10:30:00Z"),
      img_overview: ""
    },
    {
      id: 10,
      title: "DIY Headboard Ideas: Creating a Stylish Focal Point on a Budget",
      content: "Transform your bedroom with a DIY headboard! This post provides step-by-step instructions and creative ideas for building unique and stylish headboards using affordable materials.  From upholstered headboards to reclaimed wood designs, we'll show you how to add a personal touch to your bedroom without breaking the bank.",
      categoryId: 10, // Assuming 10 is "DIY Projects"
      authorId: "user123",
      createdAt: new Date("2023-10-17T14:00:00Z"),
      updatedAt: new Date("2023-10-17T14:00:00Z"),
      img_overview: ""
    }
  ];
  blogs : JoinPost[];
  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) {
    this.blogs = []
  }

  navigateBlog(id : number) {
    this._router.navigate([`blog/${id}`])
  }
  ngOnInit(): void {
      this._apiService.getAllCategories().subscribe(res => {
        if(res.ok) {
          let data = res.body as Category[]
          this.categories = data
        }
      })

      this._apiService.getAllPosts().subscribe(res => {
        if(res.ok) {
          let data = res.body as JoinPost[];
          this.blogs = data
        }
      })
  }
}
