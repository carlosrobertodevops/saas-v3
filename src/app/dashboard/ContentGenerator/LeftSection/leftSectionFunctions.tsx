// Traduções
import { useTranslations } from "next-intl";

import { SingleTemplate } from "@/src/types/AppType";
import { prompts } from "./prompts";
import { v4 as uuidv4 } from "uuid";

import MainTopic from "./MainTopic";
import ToneOrStyle from "./ToneOrStyle";
import Audience from "./Audience";
import LanguageSelector from "@/src/components/LanguageSelector";
import Keywords from "@/src//components/Keywords";
import { useAppContext } from "@/src/app/AppContext";
import { Dispatch, SetStateAction } from "react";

export async function generateContent(
  selectedTemplate: SingleTemplate | null,
  mainTopicInput: string,
  toneOrStyleInput: string,
  selectLanguage: string,
  audienceInput: string,
  keywords: string[],
) {
  let prompt = "";
  let theTitle = "";

  switch (selectedTemplate?.title) {
    case "Post Title":
      prompt = `
        Generate a post title for "${mainTopicInput}" in a ${toneOrStyleInput} tone.
        Use an <h1> tag for the title.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Blog Tags":
      prompt = `
        Generate blog tags for "${mainTopicInput}".
        Format the tags in a comma-separated list within a <p> tag.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Youtube Hashtags":
      prompt = `
        Generate YouTube hashtags for "${mainTopicInput}".
        Format the hashtags in a comma-separated list within a <p> tag.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Text Summarizer":
      prompt = `
        Summarize the following content: "${mainTopicInput}".
        Use a <p> tag for the summary.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Content Rewriter":
      prompt = `
        Rewrite the following content: "${mainTopicInput}".
        Use a <p> tag for the rewritten content.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Product Description":
      prompt = `
        Generate a product description for "${mainTopicInput}".
        Use an <h2> tag for the product name and a <p> tag for the description.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Blog Section":
      prompt = `
        Create a blog section about "${mainTopicInput}".
        Use an <h2> tag for the section title and <p> tags for the content.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Link Bio":
      prompt = `
        Generate a link bio for "${mainTopicInput}".
        Use <ul> and <li> tags to format the links.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Instagram Captions":
      prompt = `
        Create Instagram captions for "${mainTopicInput}".
        Use a <p> tag for each caption.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Code Generator":
      prompt = `
      Generate a code snippet for the topic "${mainTopicInput}" in ${selectLanguage}.
      Include the code only inside <pre><code></code></pre> tags without any Markdown formatting, and after the code
      add an explanation in <p> tags.
    `;

      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Email Newsletter":
      prompt = `
        Create an email newsletter for "${mainTopicInput}".
        Structure it with:
        - A greeting in a <div id="greeting">
        - Main content in a <div id="main-content"> with <p> tags
        - Closing in a <div id="closing">.
        Tone: ${toneOrStyleInput}
        Audience: ${audienceInput.trim()}
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Question & Answer":
      prompt = `
        Generate a Q&A format for "${mainTopicInput}".
        Use <h3> for questions and <p> for answers.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Facebook Ads":
      prompt = `
        Create a Facebook ad for "${mainTopicInput}".
        Use <h2> for the headline and <p> for the ad content.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "SEO Meta Description":
      prompt = `
        Generate an SEO Meta Description in HTML format for "${mainTopicInput}".
        Include relevant keywords: ${keywords.join(", ")}.
        Use a <meta> tag for the description.
      `;
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    default:
      console.log("Unknown template");
      return;
  }

  console.log("prompt", prompt);

  // Make a POST request to your API route to generate content
  try {
    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt, // Your prompt here
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate content");
    }

    const data = await response.json();
    const content = data.output; // Assuming your API returns `output` as the generated content

    // Format the output for specific templates
    switch (selectedTemplate.title) {
      case "Post Title":
        return { theTitle, prompt, content: `<h1>${content}</h1>` };

      case "Blog Tags":
      case "Youtube Hashtags":
        return { theTitle, prompt, content: `<p>${content}</p>` };

      case "Text Summarizer":
      case "Content Rewriter":
      case "Product Description":
      case "Blog Section":
      case "Instagram Captions":
        return { theTitle, prompt, content: `<p>${content}</p>` };

      case "Link Bio":
        return {
          theTitle,
          prompt,
          content: `<ul>${content
            .split(",")
            .map((tag: string) => `<li>${tag.trim()}</li>`)
            .join("")}</ul>`,
        };

      case "Code Generator":
        return { theTitle, prompt, content: `${content}` };

      case "Email Newsletter":
        return {
          theTitle,
          prompt,
          content: `
            <div id="greeting"><p>${content.greeting}</p></div>
            <div id="main-content"><p>${content.mainContent}</p></div>
            <div id="closing"><p>${content.closing}</p></div>
          `,
        };

      case "Question & Answer":
        return {
          theTitle,
          prompt,
          content: content
            .map(
              (qna: { question: string; answer: string }) =>
                `<h3>${qna.question}</h3><p>${qna.answer}</p>`,
            )
            .join(""),
        };

      case "Facebook Ads":
        return {
          theTitle,
          prompt,
          content: `<h2>${content.headline}</h2><p>${content.body}</p>`,
        };

      case "SEO Meta Description":
        return {
          theTitle,
          prompt,
          content: `<meta name="description" content="${content}" />`,
        };

      default:
        return {
          theTitle,
          prompt,
          content: "<p>Error generating content. Please try again.</p>",
        };
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return {
      theTitle,
      prompt,
      content: "<p>Error generating content. Please try again.</p>",
    };
  }
}

export const RenderFormFields = () => {
  const t = useTranslations("render_form_fields");

  const {
    selectedTemplatesObject: { selectedTemplate },
  } = useAppContext();

  switch (selectedTemplate?.title) {
    case "Post Title":
      return (
        <>
          <MainTopic
            label={t("blog_topic_label")}
            placeholder={t("blog_topic_placeholder")}
          />
          <ToneOrStyle />
        </>
      );
    case "Blog Tags":
      return (
        <>
          <MainTopic
            label={t("blog_tag_label")}
            placeholder={t("blog_tag_placeholder")}
          />
          <Audience />
        </>
      );
    case "Youtube Hashtags":
      return (
        <>
          <MainTopic
            label={t("blog_context_label")}
            placeholder={t("blog_context_placeholder")}
          />
          <Audience />
        </>
      );
    case "Code Generator":
      return (
        <>
          <MainTopic
            label={t("programming_task_label")}
            placeholder={t("programming_task_placeholder")}
          />
          <LanguageSelector />
        </>
      );
    case "Email Newsletter":
      return (
        <>
          <MainTopic
            label={t("newsletter_topic_label")}
            placeholder={t("newsletter_placeholder_placeholder")}
          />
          <Audience />
          <ToneOrStyle />
        </>
      );
    case "Question & Answer":
      return (
        <>
          <MainTopic
            label={t("main_question_label")}
            placeholder={t("main_question_placeholder")}
          />
          <ToneOrStyle />
          <Audience />
        </>
      );
    case "Text Summarizer":
      return (
        <>
          <MainTopic
            label={t("text_summarize_label")}
            placeholder={t("text_summarize_placeholder")}
          />
          <ToneOrStyle />
        </>
      );
    case "Content Rewriter":
      return (
        <>
          <MainTopic
            label={t("content_rewrite_label")}
            placeholder={t("content_rewrite_placeholde")}
          />
          <ToneOrStyle />
        </>
      );
    case "Product Description":
      return (
        <>
          <MainTopic
            label={t("product_name_label")}
            placeholder={t("product_name_placeholder")}
          />
          {/* <ProductFeatures /> */}
          <ToneOrStyle />
        </>
      );
    case "Facebook Ads":
      return (
        <>
          <MainTopic
            label={t("ad_content_label")}
            placeholder={t("ad_content_placeholder")}
          />
          <Audience />
          <ToneOrStyle />
        </>
      );
    case "Blog Section":
      return (
        <>
          <MainTopic
            label={t("section_topic_label")}
            placeholder={t("section_topic_placeholder")}
          />
          <ToneOrStyle />
        </>
      );
    case "SEO Meta Description":
      return (
        <>
          <MainTopic
            label={t("page_content_label")}
            placeholder={t("your_profession_placeholder")}
          />
          <Keywords />
        </>
      );
    case "LinkedIn Bio":
      return (
        <>
          <MainTopic
            label={t("your_profession_label")}
            placeholder={t("your_profession_placeholder")}
          />
          {/* <CareerAchievements /> */}
        </>
      );
    case "Instagram Captions":
      return (
        <>
          <MainTopic
            label={t("instagram_captions_label")}
            placeholder={t("instagram_captions_placeholder")}
          />
          <ToneOrStyle />
          {/* <Hashtags /> */}
        </>
      );
    default:
      return (
        <>
          <MainTopic
            label={t("blog_topic_label")}
            placeholder={t("blog_topic_placeholder")}
          />
          <ToneOrStyle />
          <Audience />
        </>
      );
  }
};
