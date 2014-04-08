---
layout: post
title: Fixing Choppy Animations and UI on Mac
category: posts
---

I've been having this problem for several months now and it mostly affected Exposé and switching between full-screen apps. It was very annoying to say the least, but I learned to live with it by tweaking the animation duration, like so:
{% highlight bash %}
{% raw %}
defaults delete com.apple.dock expose-animation-duration -float 0 ; killall Dock
{% endraw %}
{% endhighlight %}
<br>
Swiping between full screen apps still resulted in choppy animation though, which bugged me for months. I didn't want to do a clean install on my two-year old Mac so I tried to find something online.

Doing so, I found the following (admittedly weird) solution:

- Repair disk permission using Disk Utility
- Restart Mac OS X
- Launch AutoCAD 2013 (?)
- Close AutoCAD 2013

I don't know if this works on retina MacBooks, but it's worth a try.
