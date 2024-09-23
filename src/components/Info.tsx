const Info = () => {
  return (
    <>
      <main className="w-full bg-[#f0f1f7] h-[100vh] flex justify-center items-center">
        <section className="w-[600px] s500:w-full s500:p-5 flex items-center flex-col rounded-md p-14 min-h-[200px] bg-white">
          <div className="w-full p-5 rounded-md bg-[#eee6ff]">
            <p className="text-[13px] leading-8 text-slate-500">
              <span className="font-bold text-[#906AE2]">NOTE: </span> To
              complete your sign-up process and gain access to our services,
              please check your email inbox (including spam or promotions
              folders) for a verification message. Click on the verification
              link provided to confirm your email address. After verification,
              you will be automatically redirected back to the sign-in page to
              access your account. If you don't see the email within a few
              minutes, please check your spam folder or contact our support team
              for assistance. Thank you for joining us!
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Info;
