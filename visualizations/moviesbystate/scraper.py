#!usr/bin/python

from bs4 import BeautifulSoup
import urllib2
import os
import csv
import glob

# Append state name here
base_url = "http://www.imdb.com/search/title?num_votes=12000,&sort=moviemeter,asc&title_type=feature&locations="

USStates = {
	"Alabama" : "AL",
	"Alaska" : "AK",
	"Arizona" : "AZ",
	"Arkansas" : "AR",
	"California" : "CA",
	"Colorado" : "CO",
	"Connecticut" : "CT",
	"Delaware" : "DE",
	"Florida" : "FL",
	"Georgia" : "GA",
	"Hawaii" : "HI",
	"Idaho" : "ID",
	"Illinois" : "IL",
	"Indiana" : "IN",
	"Iowa" : "IA",
	"Kansas" : "KS",
	"Kentucky" : "KY",
	"Louisiana" : "LA",
	"Maine" : "ME",
	"Maryland" : "MD",
	"Massachusetts" : "MA",
	"Michigan" : "MI",
	"Minnesota" : "MN",
	"Mississippi" : "MS",
	"Missouri" : "MO",
	"Montana" : "MT",
	"Nebraska" : "NE",
	"Nevada" : "NV",
	"New Hampshire" : "NH",
	"New Jersey" : "NJ",
	"New Mexico" : "NM",
	"New York" : "NY",
	"North Carolina" : "NC",
	"North Dakota" : "ND",
	"Ohio" : "OH",
	"Oklahoma" : "OK",
	"Oregon" : "OR",
	"Pennsylvania" : "PA",
	"Rhode Island" : "RI",
	"South Carolina" : "SC",
	"South Dakota" : "SD",
	"Tennessee" : "TN",
	"Texas" : "TX",
	"Utah" : "UT",
	"Vermont" : "VT",
	"Virginia" : "VA",
	"Washington" : "WA",
	"West Virginia" : "WV",
	"Wisconsin" : "WI",
	"Wyoming" : "WY"
}


# Get number of movies shot in every state and output to csv.
# Save 5 (max) thumbnails to disk.
def get_movies_by_state():
	with open('movies_state.csv', 'wb') as fp:
		csvwriter = csv.writer(fp, delimiter=',')
		csvwriter.writerow(['state', 'value'])
		for i in USStates:
			app_url = urllib2.quote(i + ", usa")
			url = base_url + app_url
			html = urllib2.urlopen(url).read()
			soup = BeautifulSoup(html, "lxml")
			rdiv = soup.find("div", {"id":"left"})

			# 3 cases here:
			# 	x of y titles
			# 	x titles
			# 	No results (not in this sample set)

			if rdiv.contents[0].replace('\n', ' ').split(' ')[2] == 'of':
				num = rdiv.contents[0].replace('\n', ' ').split(' ')[3]
			else:
				num = rdiv.contents[0].replace('\n', ' ').split(' ')[1]
			csvwriter.writerow([i, num])
			print i + ": " + num

			num = int(num.replace(',',''))
			if num > 5:
				num_ = 5
			else:
				print 'bla'
				num_ = num

			try:
				img_links = soup.findAll("td", {"class" : "image"})
				for j in range(num_):
					print num_, num
					img_link = img_links[j].img["src"]
					# Get higher quality thumbnails
					img_link = img_link.replace("SX54_CR0,0,54,74", "SY317_CR4,0,214,317")
					img_file = open("./img/"+USStates[i]+str(j)+".png", "w")
					img_file.write(urllib2.urlopen(img_link).read())
					img_file.close()
			except AttributeError:
				pass











get_movies_by_state()