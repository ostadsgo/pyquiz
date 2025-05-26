let questionObjects = [
  {
    title: "کدام یک از گزینه های زیر نام مجاز برای متغیر می باشد؟",
    code: "",
    options: ["1_value", "data-row", "price_in_$_", "_output"],
    answer: "_output",
  },
  {
    title:
      "اگر متغیر appcosts برابر صفر باشد کدام یک از گزینه های زیر غیر مجاز است؟",
    code: "",
    options: [
      "appcosts = appcosts + 6.99",
      "appcosts + 6.99 = appcosts",
      "app_costs += 6.99",
      "هیچ کدام",
    ],
    answer: "appcosts + 6.99 = appcosts",
  },
  {
    title: "اگر تابعی دارای دستور return  نباشد چه مقداری برگشت میدهد؟",
    code: "",
    options: ["None", "0", "1", "False"],
    answer: "None",
  },
  {
    title: "خروجی تکه کد زیر چیست",
    code: `
    x = 10
    y = 5
    result = x % y
    print(result)
    `,
    options: ["0", "1", "2", "5"],
    answer: "0",
  },
];
