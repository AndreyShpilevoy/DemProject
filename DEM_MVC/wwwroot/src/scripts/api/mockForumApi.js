import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const forums = [{
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/forums/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
}, {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/forums/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
}, {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/forums/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
}, {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/forums/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
}, {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/forums/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
}];

class ForumApi {
    static getAllForums() {
        return new Promise((resolve) => {//, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], forums));
            }, delay);
        });
    }
  }


export default ForumApi;
