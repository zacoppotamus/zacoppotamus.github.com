---
layout: post
title: Data Structures and Algorithms Cheat Sheet
category: posts
---

Some revision notes from my Data Structures and Algorithms course.

## Zac's Big (Not So) List of Algorithms


Algorithm   | Complexity
:---------:|:-------:
Depth-First Search   | $$O(\|V\| + \|E\|)$$
Breadth-First Search   | $$O(\|V\| + \|E\|)$$
Bellman-Ford   | $$O(VE)$$
Dijkstra's   | $$O(ElogV)\rightarrow (binary heap))$$
Floyd-Warshall   | $$O(V^3)$$
Johnson   | $$O(VE + V^2 logV)$$
Ford-Fulkerson Max Flow  | $$O(\|f^*\|E)$$
Gale-Shapley   | $$O(n^2)$$
Counting Sort   | $$\Theta(n)$$
Radix Sort   | $$O(kn)$$
Edit Distance   | $$O(mn)$$
Kruskal's   | $$O(ElogE)\rightarrow (linked list)$$
Prim's   | $$O(ElogV)\rightarrow (binary heap)$$
Knuth-Morris-Pratt | $$O(n)$$, assuming prefix table is available


Depth-First Search Algorithm
---
Depth-First Search is an algorithm for traversing
or searching tree or graph data structures. One starts at the root, selecting some arbitrary node as the root in the case of a graph, and explores as far as possible along each branch before backtracking.

###Running Time###
The algorithm visits all the vertices in the graph twice. Once when it first discovers the vertex and a seceond time when it designates the vertex as finished. The running time is thus exactly $$O(\|V\| + \|E\|)$$.

Breadth-First Search Algorithm
---
Breadth first search traverses the graph tree one level at a time. It has a queue in which the source node is added first. The algorithm loops through the source node's neighbors and adds them to the queue while setting their distance. After a node is done it is removed from the queue and the next node is popped from the queue and the process is repeated.

###Running Time###
The code that finds every node's neighbors is executed $$|E|$$ times. We also do $$\|V\|$$ enqueuing and dequeueing operations.

Single-Source Shortest Paths
---

Given a source s, SSSP algorithms output a shortest path from s to every other vertex.

The basic idea behind SSSP algorithms is initializing a guess *v.d* for the distance from the source s: *s.d* = 0, and *v.d* = ∞ for all other vertices v.

The idea of **relaxing edges** is this:
If there is an edge $$u\rightarrow v$$ and our guess for the distance from s to v is greater than our guess for the distance from s to u **plus** *w(u,v)*, then we can improve our guess by using this edge.

###Bellman-Ford Algorithm

Can be used for graphs with negative weights and can detect negative-weight cycles.

To start off, intialize the distance of the source to 0 and the predecessor of the source to *Null* and everything else to ∞.

Iterate *[amount of node]* times through every node and all its neighbors, relaxing nodes when necessary.

To check for negative-weight cycles see if the distance of a node is smaller or equal than the distance of its predecessor from the source plus the distance between them.

###Dijkstra's Algorithm

The Bellman-Ford algorithm solves the single-source shortest paths problem in time $$O(VE)$$. We can do better with **Dijkstra's Algorithm**, however it requires that the weights in the graph are non-negative.

The algorithm is based on a priority queue. In the queue, we store the vertices whose distances from the source are not yet settled, keyed on their current distance from the source:

{% highlight python %}
Dijkstra(G,s):
for each vertex v in G:
	v.d = float(∞)
	v.pred = None
s.d = 0
add all vertices to Q with Insert()
while Q not empty:
	u = ExtractMin(Q)
	for each vertex v such that u->v:
		if v.d > u.d + weight(u,v):
			# Relax, do with ExtractMin()
			v.d = u.d + weight(u,v)
			v.pred = u
{% endhighlight %}


All-Pairs Shortest Paths
---

###Floyd-Warshall Algorithm

Assume we are given access to a graph *G* with *n* vertices as a $$n\times n$$ adjacency matrix *W*.

Let $$d_{ij}^{(k)}$$ be the weight of a shortest path from *i* to *j* such that the intermediate vertices are all in the set {1,...,k}.

If W is the adjacency matrix, we have the following algorithm for computing $$d_{ij}^{(n)}$$ for all pairs *i*, *j*.

{% highlight python %}
FloydWarshall(W):
d^(0) = W
for k = 1 to n
	for i = 1 to n
		for j = i to n
			d_(ij)^k = min(d_(ij)^(k-1), d_(ik)^(k-1) + d_(kj)^(k-1))
return d^(n)
{% endhighlight %}


###Johnson's Algorithm

For sparse graphs with non-negative weight edges, running Dijkstra with each vertex in turn as the source is more efficient than the Floyd-Warshall algorithm.

Johnson's algorithm uses Dijkstra's algorithm to solve the all-pairs shortes paths problem for graphs which may have negative-weight edges. It is based around the idea of first **reweighting** *G* so that all the weights are non-negative, then using Dijkstra.

For sparse graphs, its complexity is faster than the Floyd-Warshall algorithm.



PageRank Algorithm
---

Each node is ranked based on how many other **important** nodes link to it.

A link from an important web page is more significant than a link from an unimportant web page, so it should be worth more.

Also, being linked from a page which has many outgoing links is worth less than being linked from a page with only few outgoing links.

The simplified formula is: $$PR(v) = \sum_{u\epsilon B(v)} \frac{R(u)}{deg(u)}$$,

where *B(v)* is the number of backlinks from v (set of vertices *u* such that there is an edge $$u\rightarrow v$$).

More accurate formula is: $$PR(v) = {p\over N} + (1-p)\sum_{u\epsilon B(v)} \frac{R(u)}{deg(u)}$$,

where p is some constant between 0 and 1 (usually 0.15).


Flow Networks
---
A flow network is a graph in which each edge has a nonegative capacity c.

We distinguish two vertices in a flow network. A **source** s and a **sink** t.

A flow f in the network is a real-valued function f that:

* Is nonnegative and smaller than c(u,v)
* The outcoming flow of a vertex is equal to the incoming flow.

The **value** $$\|f\|$$ of the flow function f is defined as the difference of the outcoming flow from the source to the incoming flow.

Linear Programming
---
Linear Programming is *optimizing* a linear function subject to a set of linear inequalities.

Optimizing a function is finding the minimum and maximum value of the function.

Stable Matching
---
We say a matching between a group A and a group B is stable if at least one of the following is true:

* Elements from group A prefer every one of their accepted elements from other elements in group B.
* Element from group B prefers current situation over being matched with another elements from group A.

In other words, a matching is stable when there doesn't exist any alternative pairing m, w in which both m and w are individually better off than they would be with the person to which they are currently matched.


MST
---

###Kruskal's Algorithm

Using a disjoint-set data structure do **MakeSet()** for every vertex $$v \epsilon G$$.

Sort the edges of G into non-decreasing order by weight.

For each edge $$u \leftrightarrow v$$ in order, if *u* and *v* are in disjoint sets, add that edge to our spanning tree and do the **union()** operation on the two sets.

###Prim's Algorithm

While Kruskal's algorithm maintains a forest *F* and uses the rule: "add the lightest edge between two components of *F*" at each step, a different approach is used by **Prim's Algorithm**.

**Prim's Algorithm** maintains a connected tree *T* and extends it with the lightest possible edge.

It is based on the use of a **priority queue** *Q*.

For each vertex *v*, *v.key* is the weight of the **lightest edge** connecting *v* to *T*.

This algorithm is very similar to Dijkstra's Algorithm. Starting off, set the key for all the vertices to ∞ and their predecessors to *Nil*.

Choose an arbitrary vertex *r*, set its key to 0 and add all other vertices to a **priority queue**. As long as the queue is not empty, extract the minimum vertex *u* and for each neighboring vertex *v*, if *v.key > w(u,v)* and $$V \epsilon Q$$, do **decreaseKey(v, w(u,v))**, and set *v*'s predecessor to *u*.

Sorting
---
**Merge Sort** and **Heap Sort** are asymptotically optimal comparison sorting algorithms.

Any **decision tree** that can sort n elements must have height $$\Omega(nlogn)$$.

A sorting algorithm is **stable** if whenever there are two values of a in the list, the one that appears first in the original list will appear first in the sorted list.

###Counting Sort

If $$k \epsilon \Theta(n)$$ then the total running time of counting sort is $$\Theta(n)$$. This is the case because counting sort is not a comparison sort.

###Radix Sort

Start from the rightmost digit of every number and hold a bucket array from 0-9. For every digit encountered, increment the corresponding element of the bucket. Then add the elements of the bucket pairwise. Again access the the rightmost digit, go to that position of the bucket array, decrement the number by 1 and add to that position in another array.





Dynamic Programming
---

Dynamic Programming is a way of finding efficient algorithms for problems which can be broken down into simpler, overlapping problems.

The idea is:

* Find an exponential-time recursive algorithm
* Speed up the algorithm by storing solutions to subproblems
* Speed it up further by solving subproblems in a more efficient order.

Dynamic programming is different than **greedy algorithms**, which make the locally optimal choice, which may not be the globally optimal choice.

Dynamic Programming is also different to **divide-and-conquer** algorithms. Divide-and-conquer algorithms also work recursively but their sub-problems do not overlap.

One way of improving a recursive function is by **memoizing** the algorithm. This means we create an array for storing the results of already computed calls from the function.

Therefore, another recipe for dynamic programming is this:

* Start out with a problem which can be presented **recursively** in terms of **overlapping subproblems**.
* Write down a naïve recursive algorithm based on this presentation.
* **Memoize** the recursive algorithm.
* Restructure the algorithm to obtain a "bottom-up" algorithm which computes solutions in an efficient order, with no recursion.


###Fibonacci

Recursive Fibonacci algorithm takes exponential time. More specifically it's big-O complexity is similar to the Golden Ratio.

The memoized version of the algorithm takes $$O(n^2)$$ running time. Each entry in the memory is only computed once, so there are only $$O(n)$$ integer additions. Each addition can be performed in time $$O(n)$$, so the total running time is $$O(n^2)$$.

The ascending version of the algorithm uses $$O(n)$$ additions and stores $$O(n) integers.


###Edit Distance

The edit distance ED between two strings s and t is defined as the minimal number of insertions, deletions and replacements of individual characters required to change s into t. Each such operation is called an **edit**.

An equivalent way of looking at this problem is as the problem of optimal alignment of strings. Given two strings s and t, an alignment of the strings is simply writing one above the other, possibly with gaps between the letters.

The **cost** of an alignment is the number of positions at which the aligned strings differ.

The recurrence for the edit distance is:

$$\\ED(s,t) = min( ED(s[1,...,n-1], t[1,...,m-1]) + [s[n] \neq t[m]],\\\ ED(s[1,...,n-1],t) + 1,\\\ ED(s,t[1,...,m-1]) + 1)$$


Data Structures
---

###Binary Heaps

A **binary heap** is an "almost complete" binary tree, where every level is full except possibly the lowest, which is full from left to right.

It also satisfies the **heap property**. Each element is less than or equal to each of its children.

A *binary heap* can be implemented efficiently using an array A. We have the following directives:

{% highlight python %}
Parent(i) = floor(i/2)
Left(i) = 2i
Right(i) = 2i + 1
{% endhighlight %}


And also the **heapify** operation, which makes sure that the structure also maintains its heap property, eg. when a new number is added:


{% highlight python %}
Heapify(i):

if Left(i) <= heapsize and A[Left(i)] < A[i]
	smallest = Left(i)
else
	smallest = i
if Right(i) <= heapsize and A[Right[i]] < A[smallest]
	smallest = Right(i)
if smallest != i
	swap A[i] and A[smallest]
	Heapify(smallest)
{% endhighlight %}

###Priority Queue

We can use a heap to implement a **priority queue**.

A priority queue has the following operations:

* DecreaseKey()
* ExtractMin()
* Insert()

**DecreaseKey()** is shown below:

{% highlight python %}
DecreaseKey(x,k):
if k > A[x.i].key
	error("New key is larger than old key!")
A[x.i].key = k
while x.i > 0 and A[Parent(x.i)].key > A[x.i].key
	swap A[x.i] and A[Parent(x.i)]
	x.i = Parent(x.i)
{% endhighlight %}


For **ExtractMin()**, we return the 0th element and replace it with the last element and then we **Heapify()** the tree:

{% highlight python %}
ExtractMin():
if heapsize < 0
	error("Heap underflow")
min = A[0]
A[0] = A[heapsize]
heapsize = heapsize-1
Heapify(0)
return min
{% endhighlight %}


All three operations have a complexity of $$O(logn)$$.


###Skip Lists

$$O(logn)$$ complexity.

###Bloom Filters

Data structure used to determine membership in a set.

Uses $$O(n)$$ space to store n keys picked from a **universe** of size U, where U is much bigger than n, and check membership in the cache in time $$O(1)$$.

Supports **insert** and **member** operations.

Some caveats:

* Do not support deletions.
* They are non-deterministic but have some risk of **false positives**.

We have an *m*-bit string B in our structure, for some *m* to be determined. We also have access to a hash function *h* which maps each key *k* to an integer **h(k)** between 1 and m. The structure will set bit number h(k) of B to 1 when key *k* is inserted. Then to determine whether $$k \epsilon S$$, we just check whether the bit of B at position h(k) is equal to 1.

The **false positives** originate from hash collisions.


###Disjoint Sets

The simple way to implement a disjoint-set data structure is as an a array of linked list.

We have a linked list for each disjoint set. Each element *elem* in the list stores a pointer *elem.next* to the next element in the list the set element itself, *elem.data*.

We also have an array A corresponding to the universe, with each entry in the array containing a pointer to the linked list corresponding to the set in which it occurs.

Using the linked-list representation and the weighted-union heuristic, a sequence of *m* **MakeSet**, **Findset** amd **Union** operations, n of which are **Makeset** operations uses time $$O(m + nlogn)$$.

###Minimum Spanning Trees

Given a connected, undirected graph *G*, a subgraph *T* is a spanning tree if:

* Every vertex in *G* appears in *T*.
* *T* does not contain any cycles (T is a tree).

T is a **minimum** spanning tree (MST) if the sum of the weights of edges of *T* is minimal among all spanning trees of G.

Two algorithms for determining MSTs are **Kruskal's Algorithm** and **Prim's Algorithm**. The former is based on a disjoint-set data structure, while the latter is based on a priority queue. They are both greedy algorithms.

