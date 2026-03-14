import React from 'react';
import { Clock, CheckCircle2, Mail, Home, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const PendingApprovalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-lg w-full text-center">
        {/* Animated Icon */}
        <div className="relative mb-10 inline-block">
          <div className="w-28 h-28 bg-orange-100 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl shadow-orange-200/50">
            <Clock className="w-14 h-14 text-[#FF8C00]" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
          Demande Envoyée !
        </h1>
        <p className="text-gray-500 text-base font-medium mb-10 leading-relaxed">
          Votre demande d'inscription en tant que prestataire a bien été reçue.<br />
          Un administrateur va examiner votre dossier et vous notifier par email.
        </p>

        {/* Steps */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 mb-8 text-left space-y-5">
          <h2 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Prochaines étapes</h2>
          {[
            { icon: ShieldCheck, label: "Vérification du dossier", desc: "L'admin examine votre profil.", color: "text-orange-500 bg-orange-50" },
            { icon: Mail, label: "Notification par email", desc: "Vous recevrez une confirmation par email.", color: "text-blue-500 bg-blue-50" },
            { icon: CheckCircle2, label: "Accès accordé", desc: "Vous pourrez alors vous connecter et gérer vos services.", color: "text-green-500 bg-green-50" },
          ].map((step, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color}`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-800">{step.label}</p>
                <p className="text-xs text-gray-400 font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-[#FF8C00] hover:bg-[#E67E00] text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-orange-500/20 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Link>

        <p className="mt-8 text-xs text-gray-400 font-medium">
          Des questions ? Contactez-nous à{' '}
          <a href="mailto:support@djerba-tourisme.tn" className="text-orange-500 hover:underline">
            support@djerba-tourisme.tn
          </a>
        </p>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
