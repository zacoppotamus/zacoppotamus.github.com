---
layout: post
title: Binary Tree Example
category: posts
---
This is a binary tree example. I want to see if the code highlighting works. Well, it looks like it. Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit. 

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct tree
{
	char name[100];
	int year;
	struct tree* left;
	struct tree* right;
} Tree;

Tree* makenode(char *Name, int Year, Tree* l, Tree* r)
{
	Tree* t = calloc(1,sizeof(Tree));
	strncpy(t->name,Name,99);
	t->year=Year;
	t->left=l;
	t->right=r;
	return t;
}


Tree* CreateTree(void)
{
	Tree* LeftLeft3 = makenode("John F. Kennedy",1961,NULL,NULL);
	Tree* LeftLeft2 = makenode("Lyndon Johnson",1963,LeftLeft3,NULL);
	Tree* LeftRight2 = makenode("Gerald Ford",1974,NULL,NULL);
	Tree* Left1 = makenode("Richard Nixon",1969,LeftLeft2,LeftRight2);
	Tree* RightRight3 = makenode("Barack Obama",2009,NULL,NULL);
	Tree* RightLeft2 = makenode("Ronald Reagan",1981,NULL,NULL);
	Tree* RightRight2 = makenode("Bill Clinton",1993,NULL,RightRight3);
	Tree* Right1 = makenode("George H. W. Bush",1989,RightLeft2,RightRight2);
	Tree* Root = makenode("Jimmy Carter",1977,Left1,Right1);
	return Root;
}

//Presidents are sorted by year in the binary tree, not names, so a searchByName function would be useless.

char* searchByYear(Tree* root, int yr)
{
	if (root==NULL) {
		return "President not found";
	}
	else if ((root->year)>yr) {
		return searchByYear(root->left,yr);
	}
	else if ((root->year)<yr) {
		return searchByYear(root->right,yr);
	}
	else if ((root->year)==yr) {
		return root->name; 
	}
}
int main (int argc, char* argv[])
{
	int yr;

	Tree* USP = CreateTree();
	Tree* y = NULL;
	printf("Enter year: \n");
	scanf("%d",&yr);
	printf("%s\n",searchByYear(USP,yr));
	return 0;
}{% endhighlight %}

Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.

Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.

Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.
