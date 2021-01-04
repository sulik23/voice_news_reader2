import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'; 
import wordsToNumbers from 'words-to-numbers';


import  NewsCards  from './components/NewsCards/NewsCards';
import useStyles from './styles';

const alanKey = '606972cdb8c118ed6683439e8b0a8c4e2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => { 
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const [setIsOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey, 
            onCommand: ({ command, articles, number }) => { 
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'instructions') {
                    setIsOpen(true);
                } else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1 );
                } else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again...');
                    } else if(article) {
                        window.open(article[number].url, '_blank'); 
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try again...');
                    }
    
                }
            },   
        });
    },[]);

    return (
        <div>
          <div className={classes.logoContainer}>
          </div>
          <NewsCards articles={newsArticles} activeArticle={activeArticle} />
          
          {!newsArticles.length ? (
            <div className={classes.footer}>
              
              
            </div>
          ) : null}
        </div>
      );
    };
    
    export default App;